// src/components/CalendarGrid.tsx
import React from 'react';
import {Box} from '@/components/ui/box';
import {YearCalendarStyles} from './yearCalendarStyles';
import {getColorForDate} from '@/src/utils/calendarUtils';

interface CalendarGridProps {
  weeks: Date[][];
  grassData: {[date: string]: {studyTime: number}};
  startDate: Date;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  weeks,
  grassData,
  startDate,
}) => (
  <Box style={YearCalendarStyles.calendarContainer}>
    {weeks.map((week, weekIndex) => (
      <Box key={weekIndex} style={YearCalendarStyles.weekColumn}>
        {week.map((date, dayIndex) => (
          <Box
            key={dayIndex}
            style={[
              YearCalendarStyles.dayBox,
              {backgroundColor: getColorForDate(date, grassData, startDate)},
            ]}
          />
        ))}
      </Box>
    ))}
  </Box>
);
