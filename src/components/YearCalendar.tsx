import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
interface GrassData {
  [date: string]: {
    studyTime: number;
    grassScore: number;
  };
}

interface YearlyCalendarProps {
  memberId: number;
  grassData: GrassData;
}

const YearlyCalendar: React.FC<YearlyCalendarProps> = ({
  memberId,
  grassData,
}) => {
  const [weeks, setWeeks] = useState<Date[][]>([]);
  const [monthLabels, setMonthLabels] = useState<
    {index: number; month: string}[]
  >([]);
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

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
      startDate.setDate(startDate.getDate() - 52 * 7);
      startDate.setDate(startDate.getDate() - startDate.getDay());

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
    console.log('Updated grassData:', grassData);
  }, [grassData]);

  const isDateAfterStartDate = (date: Date) => {
    return date >= START_DATE;
  };

  const getColorForActivity = (studyHour: number, grassScore: number) => {
    if (grassScore === 10 && studyHour === 0) return '#DCE1CB';
    else if (studyHour === 0) return '#ebedf0';
    else if (studyHour >= 1 && studyHour <= 2) return '#c6e48b'; // 연한 초록
    else if (studyHour >= 3 && studyHour <= 4) return '#7bc96f'; // 중간 초록
    else if (studyHour >= 5 && studyHour <= 6) return '#239a3b'; // 진한 초록
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
    <View style={styles.dayLabelsContainer}>
      {dayLabels.map((day, index) => (
        <Text
          key={index}
          style={[styles.dayLabelText, {marginTop: index === 0 ? 15 : 0}]}>
          {day}
        </Text>
      ))}
    </View>
  );

  const renderMonthLabels = () => (
    <View style={styles.monthLabelsContainer}>
      {monthLabels.map((month, index) => (
        <Text
          key={index}
          style={[
            styles.monthLabelText,
            {
              left:
                month.index * (styles.dayBox.width + styles.dayBox.margin * 2) +
                30,
            },
          ]}>
          {month.month}
        </Text>
      ))}
    </View>
  );

  // 스크롤 위치 계산
  const scrollToToday = () => {
    if (scrollViewRef.current && weeks.length > 0) {
      const today = new Date();
      const daysFromStart = Math.floor(
        (today.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24),
      );
      const weekIndex = Math.floor(daysFromStart / 7);
      const dayBoxWidth = styles.dayBox.width || 12;
      const dayBoxMargin = styles.dayBox.margin || 2;
      const scrollToX = weekIndex * (dayBoxWidth + dayBoxMargin * 2) - 100;

      scrollViewRef.current.scrollTo({x: scrollToX, animated: false});
    }
  };

  return (
    <ScrollView
      horizontal
      ref={scrollViewRef}
      onContentSizeChange={scrollToToday}>
      <View style={styles.container}>
        {renderMonthLabels()}
        <View style={{flexDirection: 'row'}}>
          {renderDayLabels()}
          <View style={styles.calendarContainer}>
            {weeks.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.weekColumn}>
                {week.map((date, dayIndex) => (
                  <View
                    key={dayIndex}
                    style={[
                      styles.dayBox,
                      {backgroundColor: getColorForDate(date)},
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 30,
  },
  calendarContainer: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
  },
  weekColumn: {
    flexDirection: 'column',
  },
  dayBox: {
    width: 12,
    height: 12,
    margin: 2,
    backgroundColor: '#ebedf0',
  },
  dayLabelsContainer: {
    marginRight: 5,
    marginTop: -15,
  },
  dayLabelText: {
    fontSize: 10,
    color: '#586069',
    marginBottom: 2,
  },
  monthLabelsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: 30,
    top: 0,
  },
  monthLabelText: {
    position: 'absolute',
    fontSize: 10,
    color: '#586069',
  },
});

export default YearlyCalendar;
