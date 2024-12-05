import React, {useState, useEffect} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {Box} from '@/components/ui/box';
import {Button, ButtonText} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import DateModal from '../DateModal';
import {MonthCalendarStyles} from './monthCalendarStyles';
import {Calendar, DateData} from 'react-native-calendars';
import YearlyCalendar from '../YearCalendar';
import moment from 'moment';
import Loader from '../../Loader';
import LinearGradient from 'react-native-linear-gradient';
import {getRecord} from '@/src/api/record';
import {getMonthlyGrass} from '@/src/api/monthJandi';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import '../../../constants/Calendar/LocalConfig';
import {ICONS} from '@/src/constants/image/icons';
import Daycount from '../Daycount';
import {JANDILEVEL} from '@/src/constants/Calendar/JandiLevel';
import StudyStats from '../StudyStats';
import {MonthCalendarProps} from '../../types/CalendarType/MonthCalendarType';
const MonthCalendar = ({userId}: {userId: number}) => {
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
    if (viewMode === 'monthly') {
      const year = moment(displayedDate).year();
      const month = moment(displayedDate).month() + 1;
      fetchMonthlyGrassData(year, month);
    }
  }, [displayedDate, viewMode]);

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
  };
  const handleYearlyDataLoad = () => {
    setIsLoading(false);
  };
  const getJandiImage = (studyHour: number, grassScore: number) => {
    if (
      grassScore >= JANDILEVEL.JANDI_LEVEL_HIGH &&
      studyHour === JANDILEVEL.JANDI_LEVEL_LOW
    )
      return ICONS.JANDI_IMG;
    else if (
      studyHour === JANDILEVEL.JANDI_LEVEL_LOW ||
      grassScore < JANDILEVEL.JANDI_LEVEL_HIGH
    )
      return null;
    else if (studyHour >= 1 && studyHour <= 2) return ICONS.JANDI_IMG1;
    else if (studyHour >= 3 && studyHour <= 4) return ICONS.JANDI_IMG2;
    else if (studyHour >= 5 && studyHour <= 6) return ICONS.JANDI_IMG3;
    else if (studyHour >= 7 && studyHour <= 8) return ICONS.JANDI_IMG4;
    else return ICONS.JANDI_IMG4;
  };

  const CustomDay: React.FC<MonthCalendarProps> = ({
    date,
    state,
    grassData,
  }) => {
    const isSelected = state === 'selected';
    const isToday = moment(date.dateString).isSame(moment(), 'day');
    const studyData = grassData[date.dateString];
    const studyTime = studyData ? studyData.studyTime : 0;
    const grassScore = studyData ? studyData.grassScore : 0;
    const jandiImage = getJandiImage(studyTime, grassScore);

    return (
      <Button
        style={[
          MonthCalendarStyles.dayContainer,
          isSelected && MonthCalendarStyles.selectedDay,
          !jandiImage && MonthCalendarStyles.defaultDayContainer,
        ]}
        onPress={() => onDayPress(date)}
        disabled={state === 'disabled'}>
        {jandiImage && (
          <Image source={jandiImage} style={MonthCalendarStyles.dayImage} />
        )}
        <Text
          style={[
            MonthCalendarStyles.dayText,
            isToday && MonthCalendarStyles.todayText,
          ]}>
          {date.day}
        </Text>
      </Button>
    );
  };

  return (
    <Box style={MonthCalendarStyles.container}>
      <Daycount userId={userId} />
      {isLoading && <Loader />}
      <Box style={MonthCalendarStyles.tabContainer}>
        <TouchableOpacity
          style={MonthCalendarStyles.tabButton}
          onPress={() => handleTabPress('monthly')}
          activeOpacity={0.7}>
          <Box style={MonthCalendarStyles.tabContent}>
            {viewMode === 'monthly' && (
              <LinearGradient
                colors={['#0DD8EC', '#15EC89']}
                style={MonthCalendarStyles.activeIndicator}>
                <LinearGradient
                  colors={['#0DD8EC', '#15EC89']}
                  style={MonthCalendarStyles.dot}
                />
              </LinearGradient>
            )}
            <Text
              style={
                viewMode === 'monthly'
                  ? MonthCalendarStyles.activeTabText
                  : MonthCalendarStyles.tabText
              }>
              월간 잔디밭
            </Text>
          </Box>
        </TouchableOpacity>

        {/* 연간 잔디밭 탭 */}
        <TouchableOpacity
          style={MonthCalendarStyles.tabButton}
          onPress={() => handleTabPressYearly('yearly')}>
          <Box style={MonthCalendarStyles.tabContent}>
            {viewMode === 'yearly' && (
              <LinearGradient
                colors={['#0DD8EC', '#15EC89']}
                style={MonthCalendarStyles.activeIndicator}>
                <LinearGradient
                  colors={['#0DD8EC', '#15EC89']}
                  style={MonthCalendarStyles.dot}
                />
              </LinearGradient>
            )}
            <Text
              style={
                viewMode === 'yearly'
                  ? MonthCalendarStyles.activeTabText
                  : MonthCalendarStyles.tabText
              }>
              연간 잔디밭
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
      {viewMode === 'monthly' ? (
        <Box style={MonthCalendarStyles.monthlyContainer}>
          <Calendar
            current={displayedDate}
            onDayPress={onDayPress}
            renderArrow={() => null}
            renderHeader={() => {
              return (
                <Box style={MonthCalendarStyles.calendarHeader}>
                  <Button
                    onPress={() =>
                      setDisplayedDate(
                        moment(displayedDate)
                          .subtract(1, 'months')
                          .format('YYYY-MM-DD'),
                      )
                    }
                    style={MonthCalendarStyles.arrowButton}>
                    <ButtonText style={MonthCalendarStyles.arrowText}>
                      {'<'}
                    </ButtonText>
                  </Button>
                  <Text style={MonthCalendarStyles.headerTitle}>
                    {moment(displayedDate).format('YYYY년 M월')}
                  </Text>
                  <Button
                    onPress={() =>
                      setDisplayedDate(
                        moment(displayedDate)
                          .add(1, 'months')
                          .format('YYYY-MM-DD'),
                      )
                    }
                    style={MonthCalendarStyles.arrowButton}>
                    <Text style={MonthCalendarStyles.arrowText}>{'>'}</Text>
                  </Button>
                </Box>
              );
            }}
            theme={{
              selectedDayBackgroundColor: '#A8E6CF',
              todayTextColor: '#00adf5',
              dotColor: '#A8E6CF',
            }}
            firstDay={0}
            hideExtraDays={true}
            dayComponent={({date, state}) => (
              <CustomDay date={date} state={state} grassData={grassData} />
            )}
            extraData={grassData}
          />
          <StudyStats userId={userId} />
        </Box>
      ) : (
        <Box style={MonthCalendarStyles.yearlyView}>
          {/* 연간 잔디밭 구현 */}
          <YearlyCalendar
            memberId={userId}
            onLoadComplete={handleYearlyDataLoad}
          />
          <StudyStats userId={userId} />
        </Box>
      )}
      <DateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedDate={selectedDate}
        selectedDateData={selectedDateData}
      />
    </Box>
  );
};

export default MonthCalendar;
