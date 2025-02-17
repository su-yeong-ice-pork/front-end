// /src/components/MonthCalendar/MonthCalendar.tsx
import React, {useState, useEffect} from 'react';
import {Box} from '@/components/ui/box';
import DateModal from '../DateModal';
import YearlyCalendar from '../YearCalendar';
import moment from 'moment';
import Loader from '../../Loader';
import '@/src/constants/Calendar/LocalConfig';
import Daycount from '../Daycount';
import StudyStats from '../StudyStats';
import useMonthGrass from '@/src/hooks/calendar/useMonthGrass';
import CalendarTabs from './CalendarTabs';
import CustomCalendar from './CustomCalendar';
import {MonthCalendarStyles} from './monthCalendarStyles';
import {transformGrassData} from '@/src/utils/grassUtils';

const MonthCalendar = ({userId}: {userId: number}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateData, setSelectedDateData] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const [grassData, setGrassData] = useState<any>({});
  const [yearlyDataLoaded, setYearlyDataLoaded] = useState<boolean>(false);
  const [displayedDate, setDisplayedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  const {grass, isLoading, setYear, setMonth} = useMonthGrass();

  useEffect(() => {
    const year = moment(displayedDate).year();
    const month = moment(displayedDate).month() + 1;
    setYear(year);
    setMonth(month);
  }, [displayedDate, setYear, setMonth]);

  useEffect(() => {
    if (grass) {
      const newGrassData = transformGrassData(grass, displayedDate);
      setGrassData(newGrassData);
    } else {
      setGrassData({});
    }
  }, [grass, displayedDate]);

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setSelectedDateData(grassData[day.dateString]);
    setModalVisible(true);
  };

  const onTabPress = (mode: 'monthly' | 'yearly') => {
    setViewMode(mode);
  };

  const onMonthChange = (monthData: any) => {
    const newDateString = `${monthData.year}-${String(monthData.month).padStart(
      2,
      '0',
    )}-01`;
    setDisplayedDate(newDateString);
  };

  const handleYearlyDataLoad = () => {
    setYearlyDataLoaded(true);
  };

  return (
    <Box style={MonthCalendarStyles.container}>
      <Daycount userId={userId} />

      {isLoading && <Loader />}

      <CalendarTabs viewMode={viewMode} onTabPress={onTabPress} />

      {viewMode === 'monthly' ? (
        <Box style={MonthCalendarStyles.monthlyContainer}>
          <CustomCalendar
            currentDate={displayedDate}
            onMonthChange={onMonthChange}
            onDayPress={onDayPress}
            grassData={grassData}
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
