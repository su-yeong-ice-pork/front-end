// src/screens/StudyRecordScreen.tsx
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';

import Header from '../components/Header';
import DashLine from '../components/DashLine';
import BottomBar from '../components/BottomBar';
import ProfileCard from '../components/ProfileCard';
import {useNavigation} from '@react-navigation/native';
import NoticeModal from '../components/NoticeModal';
import {Member} from '../api/profile';
import {
  getStudyTime,
  updateStudyTime,
  getTodayAttendance,
} from '../api/studyTime';
import {
  requestLocationPermission,
  getCurrentLocation,
} from '../utils/locationUtils';
import {isPointInPolygon, SERVICE_AREA} from '../utils/serviceArea';
import {useRecoilValue} from 'recoil';
import userState from '../recoil/userAtom';
import authState from '../recoil/authAtom';

const {width} = Dimensions.get('window');

const StudyRecordScreen = () => {
  const user = useRecoilValue(userState);
  const authInfo = useRecoilValue(authState);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [todayStudyTime, setTodayStudyTime] = useState<number>(0);
  const [totalStudyTime, setTotalStudyTime] = useState<number>(0);
  const [userData, setUserData] = useState<Member | null>(null);

  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const startTimeRef = useRef<number>(0);

  // Modal state variables
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const navigation = useNavigation();

  const locationCheckIntervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    // 유저 정보 가져오기
    setUserData(user);
  }, [user]);

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
      startLocationCheckInterval();
    } else {
      stopLocationCheckInterval();
    }

    return () => {
      stopLocationCheckInterval();
    };
  }, [isRecording]);

  const startRecording = async () => {
    // 출석 여부 확인
    try {
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
        console.error('Failed to check attendance:', attendanceResponse.error);
        Alert.alert('출석 정보를 가져올 수 없습니다.');
        return;
      }
    } catch (error) {
      console.error('Error checking attendance:', error);
      Alert.alert('출석 정보를 가져올 수 없습니다.');
      return;
    }

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
        setModalMessage('잔디 스터디 기능은 도서관 내에서만 이용 가능합니다.');
        setModalVisible(true);
        return;
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('위치 정보를 가져올 수 없습니다.');
      return;
    }

    setIsRecording(true);
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setTimeElapsed(elapsed);
    }, 1000);
  };

  const stopRecording = async () => {
    if (startTimeRef.current === 0) {
      console.error('Start time is zero, cannot calculate elapsed time.');
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const elapsed = Date.now() - startTimeRef.current;
    const newTodayStudyTime = todayStudyTime + elapsed;

    setIsRecording(false);

    setTimeElapsed(0);
    startTimeRef.current = 0;

    // 서버에 공부 시간 업데이트
    const todayStudyTimeString =
      formatMillisecondsToTimeString(newTodayStudyTime);

    try {
      const response = await updateStudyTime(
        todayStudyTimeString,
        authInfo.authToken,
      );
      if (response.success) {
        setTodayStudyTime(parseTimeStringToMilliseconds(todayStudyTimeString));
      } else {
        console.error('Failed to update study time:', response.error);
      }
    } catch (error) {
      console.error('Error updating study time:', error);
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
    return ((hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0)) * 1000;
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

  let currentStudyTime = todayStudyTime;
  let currentTotalStudyTime = totalStudyTime;
  if (timeElapsed !== 0) {
    currentStudyTime = todayStudyTime + timeElapsed;
    currentTotalStudyTime = totalStudyTime + timeElapsed;
  }
  let friends = '';

  // handleNotUseableModal function
  const handleNotUseableModal = () => {
    setModalTitle('추가 예정인 기능입니다.');
    setModalMessage('');
    setModalVisible(true);
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Header Title={'기록장 / 랭킹'} />
          <ScrollView
            style={styles.main}
            contentContainerStyle={{paddingBottom: 80}}>
            {/* 기록장과 기록 랭킹 탭 */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity style={styles.activeTab}>
                <Text style={styles.activeTabText}>기록장</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inactiveTab}
                onPress={handleNotUseableModal}>
                <Text style={styles.inactiveTabText}>기록 랭킹</Text>
              </TouchableOpacity>
            </View>

            {/* 프로필 카드 */}
            <View style={styles.profileCardContainer}>
              <Text style={styles.profileCardTitle}>
                라이벌의 <Text style={styles.highlightText}>잔디</Text>가{'\n'}
                무럭무럭 자라고 있어요!
              </Text>
              <ProfileCard
                title={user?.mainTitle || ''}
                name={user?.name || ''}
                profileImage={user?.profileImage || null}
                studyMessage="중간고사 화이팅..."
                timerValue={formatTime(currentStudyTime)}
                totalTimeValue={formatTime(currentTotalStudyTime)}
                isRecording={isRecording}
                onStudyButtonPress={handleStudyButtonPress}
              />
            </View>

            {/* 점선 */}
            <DashLine />

            {/* 친구 목록 헤더 */}
            <View style={styles.membersHeader}>
              <Text style={styles.membersTitle}>친구 목록</Text>
              <TouchableOpacity
                style={styles.addMemberButton}
                onPress={handleNotUseableModal}>
                <Image
                  source={require('../../assets/images/icons/whiteUsers.png')}
                  style={styles.redStar}
                  resizeMode="contain"
                />
                <Text style={styles.addMemberButtonText}>친구 추가</Text>
              </TouchableOpacity>
            </View>

            {/* 친구 리스트 */}
            <View style={styles.membersList}>
              {friends
                ? friends.map((friend, index) => (
                    <View key={friend.id}>
                      <TouchableOpacity
                        style={styles.memberItem}
                        onPress={() => navigation.navigate('FriendsProfile')}>
                        <Image
                          source={
                            friend.image
                              ? {uri: friend.image}
                              : require('../../assets/images/icons/baseIcon.png')
                          }
                          style={styles.memberImage}
                          resizeMode="cover"
                        />
                        <View style={styles.memberInfo}>
                          <View style={styles.nameRow}>
                            <Text style={styles.memberName}>{friend.name}</Text>
                            {friend.isOnline && (
                              <View style={styles.onlineStatus}>
                                <View style={styles.onlineDot} />
                                <Text style={styles.onlineText}>공부 중</Text>
                              </View>
                            )}
                          </View>
                          <Text style={styles.memberStudyTime}>
                            오늘 공부 시간:{' '}
                            <Text style={styles.totalStudyTimeValue}>
                              {friend.todayStudyTime}
                            </Text>
                          </Text>
                          {/* 친구의 한마디 */}
                          <View style={styles.messageBubble}>
                            <Text style={styles.messageText}>
                              {friend.message}
                            </Text>
                          </View>
                          <Image
                            source={require('../../assets/images/icons/right-arrow-gray.png')}
                            style={styles.friendInfoIconAbsolute}
                            resizeMode="contain"
                          />
                        </View>
                      </TouchableOpacity>
                      {index !== friends.length - 1 && (
                        <View style={styles.separator} />
                      )}
                    </View>
                  ))
                : ''}
            </View>
          </ScrollView>
        </View>
        <NoticeModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={modalTitle}
          message={modalMessage}
        />
      </SafeAreaView>
      <BottomBar />
    </>
  );
};

export default StudyRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width: width,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1AA5AA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 20,
    width: width - 40,
    alignSelf: 'center',
  },
  friendInfoIconAbsolute: {
    position: 'absolute',
    right: 5,
    top: 25,
    width: 30,
    height: 30,
  },
  activeTab: {
    paddingBottom: 5,
    marginHorizontal: 20,
  },
  inactiveTab: {
    opacity: 0.6,
    marginHorizontal: 20,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  inactiveTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  profileCardContainer: {
    width: width - 40,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignSelf: 'center',
  },
  profileCardTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4b5563',
    marginBottom: 20,
    lineHeight: 30,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  highlightText: {
    color: '#15D58A',
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  // 점선
  dashedLine: {
    width: '90%',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#DBDBDB',
    marginVertical: 20,
    alignSelf: 'center',
  },
  // 친구 목록 헤더
  membersHeader: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
    alignSelf: 'center',
  },
  membersTitle: {
    fontSize: 16,
    color: '#454545',
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  addMemberButton: {
    backgroundColor: '#1AA5AA',
    width: 100,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addMemberButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  redStar: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  // 친구 리스트
  membersList: {
    width: width,
    backgroundColor: '#FFFFFF',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  memberImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E1E6E8',
    marginRight: 20,
  },
  memberInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 18,
    color: '#454545',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '800',
    marginRight: 10,
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1AA5AA',
    marginRight: 5,
  },
  onlineText: {
    fontSize: 14,
    color: '#1AA5AA',
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  memberStudyTime: {
    fontSize: 14,
    color: '#646464',
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    marginTop: 5,
  },
  totalStudyTimeValue: {
    color: '#009499',
  },
  messageBubble: {
    backgroundColor: '#DEEFEA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 14,
    color: '#454545',
    fontWeight: '800',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBDB',
    width: '100%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalIcon: {
    width: 46,
    height: 46,
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#4b5563',
    flex: 1,
  },
  modalHighlightText: {
    color: '#14B8A6',
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  modalSubtitle: {
    marginTop: 10,
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'left',
    lineHeight: 20,
    marginLeft: 56,
    fontWeight: '800',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    zIndex: 1,
  },
  modalCloseIcon: {
    width: 24,
    height: 24,
  },
});
