// src/hooks/useCalendarDates.ts
import {useState, useEffect} from 'react';
import {MonthLabel} from '@/src/api/yearGrass/getYearGrassType';

export const useCalendarDates = (): {
  weeks: Date[][];
  monthLabels: MonthLabel[];
} => {
  const [weeks, setWeeks] = useState<Date[][]>([]);
  const [monthLabels, setMonthLabels] = useState<MonthLabel[]>([]);

  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endDate = new Date(today);
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 52 * 7);
      startDate.setDate(startDate.getDate() - startDate.getDay());

      const weeksArray: Date[][] = [];
      let currentDate = new Date(startDate);
      const monthsMap: MonthLabel[] = [];

      while (currentDate <= endDate) {
        const week: Date[] = [];
        for (let i = 0; i < 7; i++) {
          if (currentDate > endDate) break;
          const dateCopy = new Date(currentDate);
          week.push(dateCopy);
          if (
            dateCopy.getDate() === 1 &&
            monthsMap.every(
              m =>
                m.month !== dateCopy.toLocaleString('ko-KR', {month: 'short'}),
            )
          ) {
            monthsMap.push({
              index: weeksArray.length,
              month: dateCopy.toLocaleString('ko-KR', {month: 'short'}),
            });
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        if (week.length > 0) {
          weeksArray.push(week);
        }
      }
      setWeeks(weeksArray);
      setMonthLabels(monthsMap);
    };

    generateDates();
  }, []);

  return {weeks, monthLabels};
};
