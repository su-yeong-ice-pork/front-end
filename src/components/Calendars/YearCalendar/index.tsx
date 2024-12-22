import React, {useState, useEffect, useRef, useCallback} from 'react';
import {ScrollView, ActivityIndicator} from 'react-native';
import {getMonthlyGrass} from '@/src/api/monthJandi';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import {YearCalendarStyles} from './yearCalendarStyles';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {JANDILEVEL} from '@/src/constants/Calendar/JandiLevel';
interface GrassData {
  [date: string]: {
    studyTime: number;
    grassScore: number;
  };
}

interface YearlyCalendarProps {
  memberId: number;
  onLoadComplete: () => void;
}

const YearlyCalendar: React.FC<YearlyCalendarProps> = ({
  memberId,
  onLoadComplete,
}) => {
  const authInfo = useRecoilValue(authState);
  const [weeks, setWeeks] = useState<Date[][]>([]);
  const [monthLabels, setMonthLabels] = useState<
    {index: number; month: string}[]
  >([]);
  const [grassData, setGrassData] = useState<GrassData>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
  const dayLabelMargin = Platform.OS === 'ios' ? 4.5 : 0;
  const scrollViewRef = useRef<ScrollView>(null);

  const START_DATE = new Date();
  START_DATE.setHours(0, 0, 0, 0);
  START_DATE.setDate(START_DATE.getDate() - 365);

  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endDate = new Date(today);
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 52 * 7); // 52주 전
      startDate.setDate(startDate.getDate() - startDate.getDay()); // 주 시작을 일요일로 맞춤

      const weeksArray: Date[][] = [];
      let currentDate = new Date(startDate);
      const monthsMap: {index: number; month: string}[] = [];

      while (currentDate <= endDate) {
        const week: Date[] = [];

        for (let i = 0; i < 7; i++) {
          if (currentDate > endDate) {
            break;
          }

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
  }, [memberId]);

  useEffect(() => {
    const fetchYearlyGrassData = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const allGrassData: GrassData = {};

        const fetchPromises = Array.from({length: 12}, (_, i) => {
          const month = i + 1;
          return getMonthlyGrass(memberId, year, month, authInfo.authToken);
        });

        const monthlyResults = await Promise.all(fetchPromises);

        monthlyResults.forEach((monthlyData, index) => {
          if (monthlyData) {
            monthlyData.forEach((record: any) => {
              const month = String(index + 1).padStart(2, '0');
              const day = String(record.day).padStart(2, '0');
              const dateKey = `${year}-${month}-${day}`;
              allGrassData[dateKey] = {
                studyTime: record.studyHour,
                grassScore: record.grassScore,
              };
            });
          }
        });

        setGrassData(allGrassData);
        onLoadComplete();
      } catch (error) {
        console.error('Failed to fetch yearly grass data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchYearlyGrassData();
  }, [memberId, authInfo.authToken]);

  useEffect(() => {
    console.log('Updated grassData:', grassData);
  }, [grassData]);

  const isDateAfterStartDate = (date: Date) => {
    return date >= START_DATE;
  };

  const getColorForActivity = (studyHour: number, grassScore: number) => {
    if (
      grassScore >= JANDILEVEL.JANDI_LEVEL_HIGH &&
      studyHour === JANDILEVEL.JANDI_LEVEL_LOW
    )
      return '#DCE1CB';
    else if (
      studyHour === JANDILEVEL.JANDI_LEVEL_LOW ||
      grassScore < JANDILEVEL.JANDI_LEVEL_HIGH
    )
      return '#ebedf0';
    else if (studyHour >= 1 && studyHour <= 2) return '#c6e48b';
    else if (studyHour >= 3 && studyHour <= 4) return '#7bc96f';
    else if (studyHour >= 5 && studyHour <= 6) return '#239a3b';
    else if (studyHour >= 7 && studyHour <= 8) return '#196127';
    else return '#196127';
  };

  const getColorForDate = (date: Date) => {
    if (!isDateAfterStartDate(date)) {
      return '#ebedf0';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;

    const grassEntry = grassData[dateKey];

    const studyHour = grassEntry ? grassEntry.studyTime : 0;
    const grassScore = grassEntry ? grassEntry.grassScore : 0;

    return getColorForActivity(studyHour, grassScore);
  };

  const renderDayLabels = () => (
    <Box style={YearCalendarStyles.dayLabelsContainer}>
      {dayLabels.map((day, index) => (
        <Text
          key={index}
          style={[
            YearCalendarStyles.dayLabelText,
            {marginTop: index === 0 ? 15 : dayLabelMargin},
          ]}>
          {day}
        </Text>
      ))}
    </Box>
  );

  const renderMonthLabels = () => (
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
        {renderMonthLabels()}
        <Box style={{flexDirection: 'row'}}>
          {renderDayLabels()}
          <Box style={YearCalendarStyles.calendarContainer}>
            {weeks.map((week, weekIndex) => (
              <Box key={weekIndex} style={YearCalendarStyles.weekColumn}>
                {week.map((date, dayIndex) => (
                  <Box
                    key={dayIndex}
                    style={[
                      YearCalendarStyles.dayBox,
                      {backgroundColor: getColorForDate(date)},
                    ]}
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};
export default YearlyCalendar;
