import {DateData} from 'react-native-calendars';

export type MonthCalendarProps = {
  date: DateData;
  state: 'selected' | 'disabled';
  grassData: Record<string, {studyTime: number; grassScore: number}>;
};
