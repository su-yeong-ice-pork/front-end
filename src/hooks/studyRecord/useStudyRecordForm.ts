import {useState, useRef} from 'react';
import {Alert} from 'react-native';
import {
  requestLocationPermission,
  getCurrentLocation,
} from '@/src/utils/locationUtils';
import {isPointInPolygon, SERVICE_AREA} from '@/src/utils/serviceArea';
import {useRecoilValue} from 'recoil';
import userState from '@/src/recoil/userAtom';
import authState from '@/src/recoil/authAtom';
import {getTodayAttendance} from '@/src/api/studyRecord/getTodayAttendance';
import {useStudyTime, useStudyTimeForm} from './useStudyRecord';
import {STUDY_DETAIL} from '@/src/constants/StudyDetail/studyDetail';
import {
  parseTimeStringToMilliseconds,
  formatMillisecondsToTimeString,
  formatTime,
} from '@/src/utils/time';

export const useStudyRecordForm = () => {
  const user = useRecoilValue(userState);
  const authInfo = useRecoilValue(authState);
  const token = authInfo.authToken;
  const {studyTime, refetchStudyTime} = useStudyTime(token);
  const {updateStudyTime} = useStudyTimeForm(token);

  const [activeTab, setActiveTab] = useState(STUDY_DETAIL.RECORD);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const isStoppingRef = useRef<boolean>(false);
  const isStartingRef = useRef<boolean>(false);
  const locationCheckIntervalRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null);

  const todayTimeStr =
    studyTime && studyTime.todayStudyTime
      ? studyTime.todayStudyTime
      : '00:00:00';
  const totalTimeStr =
    studyTime && studyTime.totalStudyTime
      ? studyTime.totalStudyTime
      : '00:00:00';

  const todayStudyTimeValue = parseTimeStringToMilliseconds(todayTimeStr);
  const totalStudyTimeValue = parseTimeStringToMilliseconds(totalTimeStr);

  const startLocationCheckInterval = () => {
    locationCheckIntervalRef.current = setInterval(async () => {
      if (user.name === 'ADMIN') {
        return;
      }
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert('위치 권한이 필요합니다.');
        stopRecording();
        return;
      }
      try {
        const location = await getCurrentLocation();
        const isInLibrary = isPointInPolygon(location, SERVICE_AREA);
        if (!isInLibrary) {
          setModalTitle('도서관 밖입니다.\n공부가 중지됩니다.');
          setModalMessage(
            '잔디 스터디 기능은 도서관 내에서만 이용 가능합니다.',
          );
          setModalVisible(true);
          stopRecording();
        }
      } catch (error) {
        console.error('Error getting location:', error);
        Alert.alert('위치 정보를 가져올 수 없습니다.');
        stopRecording();
      }
    }, 10 * 60 * 1000);
  };

  const stopLocationCheckInterval = () => {
    if (locationCheckIntervalRef.current) {
      clearInterval(locationCheckIntervalRef.current);
      locationCheckIntervalRef.current = null;
    }
  };

  const startRecording = async () => {
    if (isStartingRef.current) {
      return;
    }
    isStartingRef.current = true;
    setIsLoading(true);
    try {
      const attendanceResponse = await getTodayAttendance(token);
      if (attendanceResponse.success) {
        const isAttended = attendanceResponse.response.attendance;
        if (!isAttended) {
          setModalTitle('잠시만요!\n혹시 출석 인증을 하셨나요?');
          setModalMessage(
            '잔디 스터디 기능을 사용하기 위해서는\n홈 화면의 출석 인증을 먼저 해주셔야 해요!',
          );
          setModalVisible(true);
          return;
        }
      } else {
        Alert.alert('출석 정보를 가져올 수 없습니다.');
        return;
      }
      if (user.name !== 'ADMIN') {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          Alert.alert('위치 권한이 필요합니다.');
          return;
        }
        try {
          const location = await getCurrentLocation();
          const isInLibrary = isPointInPolygon(location, SERVICE_AREA);
          if (!isInLibrary) {
            setModalTitle('도서관이 아닌 곳입니다.\n');
            setModalMessage(
              '잔디 스터디 기능은 도서관 내에서만 이용 가능합니다.',
            );
            setModalVisible(true);
            return;
          }
        } catch (error) {
          Alert.alert('위치 정보를 가져올 수 없습니다.');
          return;
        }
      }
      setIsRecording(true);
      startTimeRef.current = Date.now();
      setTimeElapsed(0);
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Date.now() - startTimeRef.current;
          setTimeElapsed(elapsed);
        }
      }, 1000);
      if (user.name !== 'ADMIN') {
        startLocationCheckInterval();
      }
    } catch (error) {
    } finally {
      isStartingRef.current = false;
      setIsLoading(false);
    }
  };

  const stopRecording = async () => {
    if (isStoppingRef.current) {
      return;
    }
    isStoppingRef.current = true;
    if (!startTimeRef.current || isNaN(startTimeRef.current)) {
      isStoppingRef.current = false;
      return;
    }
    const elapsed = Date.now() - startTimeRef.current;
    if (elapsed <= 0) {
      console.error('Elapsed time is zero or negative.');
      isStoppingRef.current = false;
      return;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRecording(false);
    setTimeElapsed(0);
    // elapsed(밀리초)를 HH:MM:SS 문자열로 변환한 후 PATCH payload 생성
    const formattedTime = formatMillisecondsToTimeString(elapsed);
    const payload = {todayStudyTime: formattedTime};
    updateStudyTime(payload);
    stopLocationCheckInterval();
    refetchStudyTime();
    isStoppingRef.current = false;
  };

  const handleStudyButtonPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return {
    isRecording,
    timeElapsed,
    activeTab,
    todayStudyTime: todayStudyTimeValue,
    totalStudyTime: totalStudyTimeValue,
    isLoading,
    modalVisible,
    modalTitle,
    modalMessage,
    handleStudyButtonPress,
    handleTabPress,
    closeModal,
    formatTime,
  };
};
