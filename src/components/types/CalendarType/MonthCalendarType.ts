import {DateData} from 'react-native-calendars';

type OnDayPress = (day: DateData) => void;

export type MonthCalendarProps = {
  date: DateData;
  state: 'selected' | 'disabled';
  grassData: Record<string, {studyTime: number; grassScore: number}>;
  onDayPress: OnDayPress;
};
