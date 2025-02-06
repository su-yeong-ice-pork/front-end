import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Box} from '@/components/ui/box';
import {Button, ButtonText} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import DateModal from '../DateModal';
import CustomDay from '../CustomDay';
import {MonthCalendarStyles, calendarTheme} from './monthCalendarStyles';
import {Calendar, DateData} from 'react-native-calendars';
import YearlyCalendar from '../YearCalendar';
import moment from 'moment';
import Loader from '../../Loader';
import LinearGradient from 'react-native-linear-gradient';
import Daycount from '../Daycount';
import StudyStats from '../StudyStats';
import useMonthGrass from '@/src/hooks/calendar/useMonthGrass';

const MonthCalendar = ({userId}: {userId: number}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateData, setSelectedDateData] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const [grassData, setGrassData] = useState<any>({});

  const [displayedDate, setDisplayedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  const {grass, isLoading, error, setYear, setMonth} = useMonthGrass();

  useEffect(() => {
    const year = moment(displayedDate).year();
    const month = moment(displayedDate).month() + 1;
    setYear(year);
    setMonth(month);
  }, [displayedDate, setYear, setMonth]);

  useEffect(() => {
    if (grass) {
      const year = moment(displayedDate).year();
      const month = moment(displayedDate).month() + 1;

      let newGrassData: any = {};
      grass.forEach(record => {
        const dateKey = `${year}-${month < 10 ? `0${month}` : month}-${
          record.day < 10 ? `0${record.day}` : record.day
        }`;
        newGrassData[dateKey] = {
          studyTime: record.studyHour,
          grassScore: record.grassScore,
        };
      });
      setGrassData(newGrassData);
    } else {
      setGrassData({});
    }
  }, [grass, displayedDate]);

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
  const handleYearlyDataLoad = () => {};

  if (error) {
    return <Text>잔디 데이터를 불러오는 중 에러가 발생했습니다.</Text>;
  }

  return (
    <Box style={MonthCalendarStyles.container}>
      <Daycount userId={userId} />

      {/* 리로딩, 로딩 표시 */}
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
            onMonthChange={monthData => {
              const newDateString = `${monthData.year}-${String(
                monthData.month,
              ).padStart(2, '0')}-01`;
              setDisplayedDate(newDateString);
            }}
            onDayPress={onDayPress}
            theme={calendarTheme}
            firstDay={0}
            hideExtraDays={true}
            renderArrow={undefined}
            renderHeader={undefined}
            dayComponent={({date, state}) => (
              <CustomDay
                date={date}
                state={state}
                grassData={grassData}
                onDayPress={onDayPress}
              />
            )}
            extraData={grassData}
          />

          <StudyStats userId={userId} />
        </Box>
      ) : (
        <Box style={MonthCalendarStyles.yearlyView}>
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
