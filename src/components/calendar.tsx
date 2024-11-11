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
import {Calendar, LocaleConfig, DateData} from 'react-native-calendars';
import YearlyCalendar from './YearCalendar';
import moment from 'moment';
import Loader from './Loader';
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
  jandi: require('../../assets/images/icons/jandiImg.png'),
  jandi1: require('../../assets/images/icons/jandiImg1.png'),
  jandi2: require('../../assets/images/icons/jandiImg2.png'),
  jandi3: require('../../assets/images/icons/jandiImg3.png'),
  jandi4: require('../../assets/images/icons/jandiImg4.png'),
  jandiColor: require('../../assets/images/icons/jandiColor.png'),
};

const CalendarScreen = ({userId}: {userId: number}) => {
  const authInfo = useRecoilValue(authState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      setIsLoading(false);
    }
    console.log('월간', grassData);
  };

  useEffect(() => {
    const year = moment(displayedDate).year();
    const month = moment(displayedDate).month() + 1; // month() returns 0-based month index
    fetchMonthlyGrassData(year, month);
  }, [displayedDate]);

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    setSelectedDateData(grassData[day.dateString]);
    setModalVisible(true);
  };

  const handleTabPress = (mode: 'monthly') => {
    setViewMode(mode);
  };
  const handleTabPressYearly = (mode: 'yearly') => {
    setViewMode(mode);
    setIsLoading(true);
  };
  const handleYearlyDataLoad = () => {
    setIsLoading(false);
  };
  const getJandiImage = (studyHour: number, grassScore: number) => {
    if (grassScore >= 10 && studyHour === 0) return IMAGES.jandi;
    else if (studyHour === 0 || grassScore < 10) return null;
    else if (studyHour >= 1 && studyHour <= 2) return IMAGES.jandi1;
    else if (studyHour >= 3 && studyHour <= 4) return IMAGES.jandi2;
    else if (studyHour >= 5 && studyHour <= 6) return IMAGES.jandi3;
    else if (studyHour >= 7 && studyHour <= 8) return IMAGES.jandi4;
    else return IMAGES.jandi4;
  };

  const CustomDay = ({
    date,
    state,
  }: {
    date: DateData;
    state: string;
    marking: any;
  }) => {
    const isSelected = state === 'selected';
    const isToday = moment(date.dateString).isSame(moment(), 'day');
    const studyData = grassData[date.dateString];
    const studyTime = studyData ? studyData.studyTime : 0;
    const grassScore = studyData ? studyData.grassScore : 0;
    const jandiImage = getJandiImage(studyTime, grassScore);

    return (
      <TouchableOpacity
        style={[
          styles.dayContainer,
          isSelected && styles.selectedDay,
          !jandiImage && styles.defaultDayContainer,
        ]}
        onPress={() => onDayPress(date)}
        disabled={state === 'disabled'}>
        {jandiImage && <Image source={jandiImage} style={styles.dayImage} />}

        <Text style={[styles.dayText, isToday && styles.todayText]}>
          {date.day}
        </Text>
      </TouchableOpacity>
    );
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
      {isLoading && <Loader />}

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
          onPress={() => handleTabPressYearly('yearly')}
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
            hideExtraDays={true}
            dayComponent={({date, state, marking}) => (
              <CustomDay date={date} state={state} marking={marking} />
            )}
          />
          <View style={styles.statsContainer}>
            {userRecord ? (
              <View style={styles.rowContainer}>
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
                <View>
                  <Image
                    source={IMAGES.jandiColor}
                    style={styles.jandiColorInfo}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.jandiColorInfo}>
                <Text>스트릭 정보가 없습니다. 첫 기록을 시작해보세요!</Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.yearlyView}>
          {/* 연간 잔디밭 구현 */}
          <YearlyCalendar
            memberId={userId}
            onLoadComplete={handleYearlyDataLoad}
          />
          <View style={styles.statsContainer}>
            {userRecord ? (
              <View style={styles.rowContainer}>
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
                <Image
                  source={IMAGES.jandiColor}
                  style={styles.yearJandiColorInfo}
                />
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
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  monthlyContainer: {
    flex: 1,
    padding: 10,
  },
  yearlyView: {
    flex: 1,
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
    borderRadius: 5,
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
    padding: 10,
    backgroundColor: '#f0f4f7',
    borderRadius: 8,
    alignItems: 'flex-start',
    width: 180,
  },
  rowContainer: {
    flexDirection: 'row',
    marginLeft: 20,
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
  dayContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  selectedDay: {
    borderWidth: 2,
    borderColor: '#1AA5AA',
  },
  dayText: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: 'bold',
  },
  defaultDayContainer: {
    backgroundColor: '#E0E0E0', // 기본 동그라미 배경
  },
  todayText: {
    color: '#FF6347',
  },
  dayImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  jandiColorInfo: {
    position: 'absolute',
    top: 0,
    marginLeft: 35,
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  yearJandiColorInfo: {
    position: 'absolute',
    top: 0,
    marginLeft: 160,
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
});

export default CalendarScreen;
