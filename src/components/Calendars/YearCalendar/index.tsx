// src/components/YearlyCalendar.tsx
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {ScrollView, ActivityIndicator} from 'react-native';
import {YearCalendarStyles} from './yearCalendarStyles';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import useYearGrass from '@/src/hooks/calendar/useYearGrass';
import {
  GrassData,
  YearlyCalendarProps,
} from '@/src/api/yearGrass/getYearGrassType';
import {useCalendarDates} from '@/src/hooks/calendar/useCalendarDates';
import {DayLabels, MonthLabels} from './CalendarLables';
import {CalendarGrid} from './CalendarGrid';

const YearlyCalendar: React.FC<YearlyCalendarProps> = ({
  memberId,
  onLoadComplete,
}) => {
  const [grassData, setGrassData] = useState<GrassData>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const scrollViewRef = useRef<ScrollView>(null);

  const START_DATE = new Date();
  START_DATE.setHours(0, 0, 0, 0);
  START_DATE.setDate(START_DATE.getDate() - 365);

  const {weeks, monthLabels} = useCalendarDates();

  const {grass: yearGrass, isLoading: isYearGrassLoading} =
    useYearGrass(memberId);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // 1~12
    const combined: GrassData = {};
    if (yearGrass) {
      yearGrass.forEach(record => {
        const recordYear =
          (record as any).year ??
          (record.month > currentMonth ? currentYear - 1 : currentYear);
        const monthStr = String(record.month).padStart(2, '0');
        const dayStr = String(record.day).padStart(2, '0');
        const key = `${recordYear}-${monthStr}-${dayStr}`;
        combined[key] = {studyTime: record.studyHour};
      });
    }
    setGrassData(combined);

    if (!isYearGrassLoading && yearGrass) {
      onLoadComplete();
      setIsLoading(false);
    }
  }, [yearGrass, isYearGrassLoading, onLoadComplete]);

  const scrollToToday = useCallback(() => {
    if (scrollViewRef.current && weeks.length > 0) {
      const today = new Date();
      const daysFromStart = Math.floor(
        (today.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24),
      );
      const weekIndex = Math.floor(daysFromStart / 7);
      const dayBoxWidth = YearCalendarStyles.dayBox.width || 12;
      const dayBoxMargin = YearCalendarStyles.dayBox.margin || 2;
      const scrollToX = weekIndex * (dayBoxWidth + dayBoxMargin * 2) - 100;
      scrollViewRef.current.scrollTo({x: scrollToX, animated: false});
    }
  }, [weeks, START_DATE]);

  if (isLoading) {
    return (
      <Box style={YearCalendarStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#1AA5AA" />
        <Text>데이터를 불러오는 중...</Text>
      </Box>
    );
  }

  return (
    <ScrollView
      horizontal
      ref={scrollViewRef}
      onContentSizeChange={scrollToToday}>
      <Box style={YearCalendarStyles.container}>
        <MonthLabels monthLabels={monthLabels} />
        <Box style={{flexDirection: 'row'}}>
          <DayLabels />
          <CalendarGrid
            weeks={weeks}
            grassData={grassData}
            startDate={START_DATE}
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default YearlyCalendar;
