// src/components/CalendarLabels.tsx
import React from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {YearCalendarStyles} from './yearCalendarStyles';
import {Platform} from 'react-native';

const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

export const DayLabels: React.FC = () => (
  <Box style={YearCalendarStyles.dayLabelsContainer}>
    {dayLabels.map((day, index) => (
      <Text
        key={index}
        style={[
          YearCalendarStyles.dayLabelText,
          {marginTop: index === 0 ? 15 : Platform.OS === 'ios' ? 4.5 : 0},
        ]}>
        {day}
      </Text>
    ))}
  </Box>
);

interface MonthLabelsProps {
  monthLabels: {index: number; month: string}[];
}

export const MonthLabels: React.FC<MonthLabelsProps> = ({monthLabels}) => (
  <Box style={YearCalendarStyles.monthLabelsContainer}>
    {monthLabels.map((month, index) => (
      <Text
        key={index}
        style={[
          YearCalendarStyles.monthLabelText,
          {
            left:
              month.index *
                (YearCalendarStyles.dayBox.width +
                  YearCalendarStyles.dayBox.margin * 2) +
              30,
          },
        ]}>
        {month.month}
      </Text>
    ))}
  </Box>
);
