import React, {useEffect, useState, useRef} from 'react';
import {TouchableOpacity, Alert} from 'react-native';

import {SafeAreaView} from '@/components/ui/safe-area-view';
import {ScrollView} from '@/components/ui/scroll-view';
import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';

import Header from '../../components/Header';
import BottomBar from '../../components/BottomBar/index';
import NoticeModal from '../../components/NoticeModal';
import Loader from '../../components/Loader';

import {
  getStudyTime,
  updateStudyTime,
  getTodayAttendance,
} from '../../api/studyTime';
import {
  requestLocationPermission,
  getCurrentLocation,
} from '../../utils/locationUtils';
import {isPointInPolygon, SERVICE_AREA} from '../../utils/serviceArea';
import {useRecoilValue} from 'recoil';

import userState from '../../recoil/userAtom';
import authState from '../../recoil/authAtom';

import {STUDY_DETAIL} from '@/src/constants/StudyDetail/studyDetail';

import RecordTapSection from '@/src/components/StudyRecord/RecordTapSection';
import RankingSection from '@/src/components/StudyRecord/RankingSection';

import {
  StudyRecordScreenStyles,
  ScrollContentPaddingBottom,
} from './StudyRecordScreenStyles';

const StudyRecordScreen = () => {
  const user = useRecoilValue(userState);
  const authInfo = useRecoilValue(authState);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [activeTab, setActiveTab] = useState(STUDY_DETAIL.RECORD);
  const [todayStudyTime, setTodayStudyTime] = useState<number>(0);
  const [totalStudyTime, setTotalStudyTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const isStoppingRef = useRef<boolean>(false);
  const isStartingRef = useRef<boolean>(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const locationCheckIntervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    // 공부 시간 데이터 가져오기
    const fetchStudyTimeData = async () => {
      try {
        const response = await getStudyTime(authInfo.authToken);
        if (response.success) {
          const {todayStudyTime, totalStudyTime} = response.response;
          const todayTimeMs = parseTimeStringToMilliseconds(todayStudyTime);
          const totalTimeMs = parseTimeStringToMilliseconds(
            totalStudyTime || '00:00:00',
          );

          setTodayStudyTime(todayTimeMs);
          setTotalStudyTime(totalTimeMs);
        } else {
          console.error('Failed to fetch study time:', response.error);
        }
      } catch (error) {
        console.error('Error fetching study time:', error);
      }
    };

    fetchStudyTimeData();
  }, []);

  useEffect(() => {
    if (isRecording) {
      if (user.name !== 'ADMIN') {
        startLocationCheckInterval();
      }
    } else {
      stopLocationCheckInterval();
    }

    return () => {
      stopLocationCheckInterval();
    };
  }, [isRecording]);

  const startRecording = async () => {
    if (isStartingRef.current) {
      return;
    }
    isStartingRef.current = true;
    setIsLoading(true);
    try {
      // 출석 여부 확인
      const attendanceResponse = await getTodayAttendance(authInfo.authToken);
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
        // 위치 권한 확인 및 현재 위치 가져오기
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          Alert.alert('위치 권한이 필요합니다.');
          return;
        }

        try {
          const location = await getCurrentLocation();
          const isInLibrary = isPointInPolygon(location, SERVICE_AREA);
          if (!isInLibrary) {
            // 모달을 표시하고 타이머 시작 중지
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
      setTimeElapsed(0); // 녹화 시작 시 시간 초기화
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Date.now() - startTimeRef.current;
          setTimeElapsed(elapsed);
        }
      }, 1000);
    } catch (error) {
      // 에러 처리
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

    // 서버에 공부 시간 업데이트
    const elapsedTimeString = formatMillisecondsToTimeString(elapsed);

    try {
      const response = await updateStudyTime(
        elapsedTimeString,
        authInfo.authToken,
      );
      if (response.success) {
        const {
          todayStudyTime: todayTimeString,
          totalStudyTime: totalTimeString,
        } = response.response;
        if (todayTimeString && totalTimeString) {
          setTodayStudyTime(parseTimeStringToMilliseconds(todayTimeString));
          setTotalStudyTime(parseTimeStringToMilliseconds(totalTimeString));
        } else {
          console.error('Invalid time strings in server response.');
        }
      } else {
        console.error('Failed to update study time:', response.error);
      }
    } catch (error) {
      console.error('Error updating study time:', error);
    } finally {
      startTimeRef.current = null; // Start time 초기화
      isStoppingRef.current = false;
    }
  };

  const handleStudyButtonPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // 시간 문자열을 밀리초로 변환
  const parseTimeStringToMilliseconds = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      isNaN(seconds) ||
      hours < 0 ||
      minutes < 0 ||
      seconds < 0
    ) {
      console.error('Invalid time string:', timeString);
      return 0;
    }
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };

  // 밀리초를 시간 문자열로 변환
  const formatMillisecondsToTimeString = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatTime = (milliseconds: number) => {
    return formatMillisecondsToTimeString(milliseconds);
  };

  // 위치 확인 인터벌 시작
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
          // 모달을 표시하고 타이머 중지
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
    }, 10 * 60 * 1000); // 10분마다 체크
  };

  // 위치 확인 인터벌 중지
  const stopLocationCheckInterval = () => {
    if (locationCheckIntervalRef.current) {
      clearInterval(locationCheckIntervalRef.current);
      locationCheckIntervalRef.current = null;
    }
  };

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  const closeModal = () => setModalVisible(false);
  return (
    <>
      <SafeAreaView style={StudyRecordScreenStyles.container}>
        <Box style={StudyRecordScreenStyles.container}>
          <Header Title={STUDY_DETAIL.TITLE} />
          <ScrollView
            style={StudyRecordScreenStyles.main}
            contentContainerStyle={ScrollContentPaddingBottom}>
            <Box style={StudyRecordScreenStyles.tabsContainer}>
              <TouchableOpacity
                style={
                  activeTab === STUDY_DETAIL.RECORD
                    ? StudyRecordScreenStyles.activeTab
                    : StudyRecordScreenStyles.inactiveTab
                }
                onPress={() => handleTabPress(STUDY_DETAIL.RECORD)}>
                <Text
                  style={
                    activeTab === STUDY_DETAIL.RECORD
                      ? StudyRecordScreenStyles.activeTabText
                      : StudyRecordScreenStyles.inactiveTabText
                  }>
                  기록장
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  activeTab === STUDY_DETAIL.RANKING
                    ? StudyRecordScreenStyles.activeTab
                    : StudyRecordScreenStyles.inactiveTab
                }
                onPress={() => handleTabPress(STUDY_DETAIL.RANKING)}>
                <Text
                  style={
                    activeTab === STUDY_DETAIL.RANKING
                      ? StudyRecordScreenStyles.activeTabText
                      : StudyRecordScreenStyles.inactiveTabText
                  }>
                  기록 랭킹
                </Text>
              </TouchableOpacity>
            </Box>

            {activeTab === STUDY_DETAIL.RECORD && (
              <RecordTapSection
                title={user?.mainTitle || STUDY_DETAIL.DEFAULT_TITLE}
                name={user?.name || STUDY_DETAIL.DEFAULT_TITLE}
                profileImage={user?.profileImage || STUDY_DETAIL.DEFAULT_IMAGE}
                studyMessage={user?.message || STUDY_DETAIL.DEFAULT_MESSAGE}
                timerValue={
                  isRecording
                    ? formatTime(todayStudyTime + timeElapsed)
                    : formatTime(todayStudyTime)
                }
                totalTimeValue={formatTime(totalStudyTime)}
                isRecording={isRecording}
                onStudyButtonPress={handleStudyButtonPress}
              />
            )}

            {activeTab === STUDY_DETAIL.RANKING && <RankingSection />}
          </ScrollView>
        </Box>
        <NoticeModal
          visible={modalVisible}
          onClose={closeModal}
          title={modalTitle}
          message={modalMessage}
        />
        {isLoading && <Loader />}
        <BottomBar />
      </SafeAreaView>
    </>
  );
};

export default StudyRecordScreen;
