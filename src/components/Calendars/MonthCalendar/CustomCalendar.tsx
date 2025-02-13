// /src/components/MonthCalendar/CustomCalendar.tsx
import React from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import CustomDay from '../CustomDay';
import {MonthCalendarStyles, calendarTheme} from './monthCalendarStyles';

interface CustomCalendarProps {
  currentDate: string;
  onMonthChange: (monthData: any) => void;
  onDayPress: (day: DateData) => void;
  grassData: any;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  currentDate,
  onMonthChange,
  onDayPress,
  grassData,
}) => {
  return (
    <Calendar
      current={currentDate}
      onMonthChange={onMonthChange}
      onDayPress={onDayPress}
      theme={{
        ...calendarTheme,
        arrowColor: '#009499',
      }}
      firstDay={0}
      hideExtraDays={true}
      monthFormat="yyyy년 M월"
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
  );
};

export default CustomCalendar;
