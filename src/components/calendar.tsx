// components/calendar.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import YearlyCalendar from './YearCalendar';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {getRecord} from '../api/record';
import {getMonthlyGrass} from '../api/monthJandi';
import {useRecoilValue} from 'recoil';
import authState from '../recoil/authAtom';

// Locale 설정
LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'kr';

const IMAGES = {
  calendar: require('../../assets/images/icons/calendar.png'),
  studyTime: require('../../assets/images/icons/studyTime.png'),
};

const CalendarScreen = ({userId}: {userId: number}) => {
  const authInfo = useRecoilValue(authState);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateData, setSelectedDateData] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly');
  const [grassData, setGrassData] = useState<any>({});
  const [displayedDate, setDisplayedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [userRecord, setRecord] = useState<any>(null);

  const fetchRecordData = async () => {
    const userRecords = await getRecord(userId, authInfo.authToken);
    if (userRecords) {
      setRecord(userRecords);
    }
  };

  useEffect(() => {
    fetchRecordData();
  }, []);

  const fetchMonthlyGrassData = async (year: number, month: number) => {
    const grassRecords = await getMonthlyGrass(
      userId,
      year,
      month,
      authInfo.authToken,
    );
    if (grassRecords) {
      let newGrassData: any = {};
      grassRecords.forEach(record => {
        const dateKey = `${year}-${month < 10 ? `0${month}` : month}-${
          record.day < 10 ? `0${record.day}` : record.day
        }`;

        newGrassData[dateKey] = {
          studyTime: record.studyHour,
          grassScore: record.grassScore,
        };
      });
      setGrassData(newGrassData);
    }
    console.log('월간', grassData);
  };

  useEffect(() => {
    const year = moment(displayedDate).year();
    const month = moment(displayedDate).month() + 1; // month() returns 0-based month index
    fetchMonthlyGrassData(year, month);
  }, [displayedDate]);

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setSelectedDateData(grassData[day.dateString]);
    setModalVisible(true);
  };

  const getMarkedDates = () => {
    let markedDates: any = {};
    for (let date in grassData) {
      const activity = grassData[date];
      const color = getColorForActivity({studyHour: activity.studyTime});
      markedDates[date] = {
        customStyles: {
          container: {
            backgroundColor: color,
            borderRadius: 15,
          },
          text: {
            color: 'white',
          },
        },
      };
    }
    return markedDates;
  };

  const getColorForActivity = ({studyHour}: {studyHour: number}) => {
    if (studyHour === 0) return '#ebedf0'; // 연한 회색
    else if (studyHour >= 1 && studyHour <= 2) return '#c6e48b'; // 연한 초록
    else if (studyHour >= 3 && studyHour <= 4) return '#7bc96f'; // 중간 초록
    else if (studyHour >= 5 && studyHour <= 6) return '#239a3b'; // 진한 초록
    else if (studyHour >= 7 && studyHour <= 8)
      return '#196127'; // 아주 진한 초록
    else return '#196127'; // 8시간 초과 시에도 동일한 색상
  };

  const handleTabPress = (mode: 'monthly' | 'yearly') => {
    setViewMode(mode);
  };

  return (
    <View style={styles.container}>
      {userRecord ? (
        <View style={styles.currentDaySection}>
          <Text style={styles.currentDayText}>
            현재<Text style={styles.dayCount}> {userRecord.currentStreak}</Text>
            일 째!
          </Text>
        </View>
      ) : (
        <Text style={styles.notDayCount}>
          아직 기록된 스트릭 정보가 없습니다.
        </Text>
      )}

      {/* 탭 전환 및 연도 선택 부분 */}
      <View style={styles.tabContainer}>
        {/* 월간 잔디밭 탭 */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('monthly')}
          activeOpacity={0.7}>
          <View style={styles.tabContent}>
            {viewMode === 'monthly' && (
              <LinearGradient
                colors={['#0DD8EC', '#15EC89']}
                style={styles.activeIndicator}>
                <LinearGradient
                  colors={['#0DD8EC', '#15EC89']}
                  style={styles.dot}
                />
              </LinearGradient>
            )}
            <Text
              style={
                viewMode === 'monthly' ? styles.activeTabText : styles.tabText
              }>
              월간 잔디밭
            </Text>
          </View>
        </TouchableOpacity>

        {/* 연간 잔디밭 탭 */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('yearly')}
          activeOpacity={0.7}>
          <View style={styles.tabContent}>
            {viewMode === 'yearly' && (
              <LinearGradient
                colors={['#0DD8EC', '#15EC89']}
                style={styles.activeIndicator}>
                <LinearGradient
                  colors={['#0DD8EC', '#15EC89']}
                  style={styles.dot}
                />
              </LinearGradient>
            )}
            <Text
              style={
                viewMode === 'yearly' ? styles.activeTabText : styles.tabText
              }>
              연간 잔디밭
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {viewMode === 'monthly' ? (
        <View style={styles.monthlyContainer}>
          <Calendar
            key={displayedDate}
            current={displayedDate}
            onDayPress={onDayPress}
            markedDates={getMarkedDates()}
            markingType={'custom'}
            renderArrow={() => null}
            renderHeader={() => {
              return (
                <View style={styles.calendarHeader}>
                  <TouchableOpacity
                    onPress={() =>
                      setDisplayedDate(
                        moment(displayedDate)
                          .subtract(1, 'months')
                          .format('YYYY-MM-DD'),
                      )
                    }
                    style={styles.arrowButton}>
                    <Text style={styles.arrowText}>{'<'}</Text>
                  </TouchableOpacity>
                  <Text style={styles.headerTitle}>
                    {moment(displayedDate).format('YYYY년 M월')}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setDisplayedDate(
                        moment(displayedDate)
                          .add(1, 'months')
                          .format('YYYY-MM-DD'),
                      )
                    }
                    style={styles.arrowButton}>
                    <Text style={styles.arrowText}>{'>'}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            theme={{
              selectedDayBackgroundColor: '#A8E6CF',
              todayTextColor: '#00adf5',
              dotColor: '#A8E6CF',
            }}
            firstDay={0}
          />
          <View style={styles.statsContainer}>
            {userRecord ? (
              <View>
                <View>
                  <Text style={styles.statsText}>
                    <Image source={IMAGES.calendar} />
                    최장{' '}
                    <Text style={styles.highlight}>{userRecord.maxStreak}</Text>
                    일 유지
                  </Text>
                  <Text style={styles.statsText}>
                    <Image source={IMAGES.studyTime} style={styles.statsTime} />
                    총 공부시간{' '}
                    <Text style={styles.highlight}>
                      {Math.floor(userRecord.totalStudyTime)}
                    </Text>
                    시간
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <Text>스트릭 정보가 없습니다. 첫 기록을 시작해보세요!</Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.yearlyView}>
          {/* 연간 잔디밭 구현 */}
          <YearlyCalendar memberId={userId} />
          <View style={styles.statsContainer}>
            {userRecord ? (
              <View>
                <View>
                  <Text style={styles.statsText}>
                    <Image source={IMAGES.calendar} />
                    최장{' '}
                    <Text style={styles.highlight}>{userRecord.maxStreak}</Text>
                    일 유지
                  </Text>
                  <Text style={styles.statsText}>
                    <Image source={IMAGES.studyTime} style={styles.statsTime} />
                    총 공부시간{' '}
                    <Text style={styles.highlight}>
                      {Math.floor(userRecord.totalStudyTime)}
                    </Text>
                    시간
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <Text>스트릭 정보가 없습니다. 첫 기록을 시작해보세요!</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* 날짜 클릭 시 모달 */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* 날짜 포맷을 변경하여 보기 좋은 형태로 표시 */}
            <Text style={styles.modalTitle}>
              {selectedDate
                ? moment(selectedDate, 'YYYY-MM-DD').isValid()
                  ? moment(selectedDate, 'YYYY-MM-DD').format(
                      'YYYY년 MM월 DD일',
                    )
                  : '유효하지 않은 날짜'
                : ''}
            </Text>
            {selectedDateData ? (
              <>
                <Text style={styles.modalDesc}>
                  공부 시간: {selectedDateData.studyTime} 시간
                </Text>
                <Text style={styles.modalDesc}>
                  잔디 점수: {selectedDateData.grassScore}
                </Text>
              </>
            ) : (
              <Text>데이터가 없습니다.</Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 사용하도록 변경
    backgroundColor: '#F5F5F5',
    // width: width, // 제거
    // height: height, // 제거
  },
  monthlyContainer: {
    flex: 1, // 남은 공간을 사용하도록 설정
    padding: 10,
  },
  yearlyView: {
    flex: 1, // 남은 공간을 사용하도록 설정
    padding: 20,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CB6A9',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabContent: {
    alignItems: 'center',
  },
  activeIndicator: {
    width: 80,
    height: 3,
    borderRadius: 40,
    alignItems: 'flex-end',
  },
  borderLine: {
    width: '100%',
    height: 4,
    borderRadius: 2,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5, // Half of width and height for a perfect circle
    marginTop: 7,
  },
  tabText: {
    fontSize: 15,
    marginTop: 15,
    color: '#B0D8D3',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  activeTabText: {
    fontSize: 15,
    marginTop: 10,
    color: '#FFFFFF',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  statsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f4f7',
    borderRadius: 8,
    alignItems: 'flex-start',
    width: 180,
  },
  statsText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  highlight: {
    color: '#1AA5AA',
    fontWeight: 'bold',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerYearText: {
    color: '#009499',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerMonthText: {
    color: '#009499',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  headerArrows: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#000000',
  },
  modalDesc: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#000000',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1AA5AA',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  currentDaySection: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  notDayCount: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 17,
    color: '#009499',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: 'bold',
  },
  dayCount: {
    fontSize: 32,
    color: '#009499',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: 'bold',
  },
  currentDayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    color: '#009499',
    fontSize: 24,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#009499',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
  },
});

export default CalendarScreen;
