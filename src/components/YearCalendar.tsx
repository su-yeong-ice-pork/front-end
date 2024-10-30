import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {getYearlyGrass, GrassData} from '../api/YearJandi';

const YearlyCalendar = ({memberId}: {memberId: number}) => {
  console.log('Member ID:', memberId);
  const [weeks, setWeeks] = useState<Date[][]>([]);
  const [monthLabels, setMonthLabels] = useState<
    {index: number; month: string}[]
  >([]);
  const [grassData, setGrassData] = useState<GrassData[]>([]);
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  const START_DATE = new Date();
  START_DATE.setHours(0, 0, 0, 0); // Set to midnight
  START_DATE.setDate(START_DATE.getDate() - 365); // Go back 1 year

  useEffect(() => {
    const fetchGrassData = async () => {
      const today = new Date();
      const year = today.getFullYear();

      const grass = await getYearlyGrass(memberId, year);
      if (grass) {
        setGrassData(grass);
      }
    };

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
            monthsMap.every(m => m.month !== dateCopy.getMonth())
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

    fetchGrassData();
    generateDates();
  }, [memberId]);

  // grassData 업데이트 시 로그 출력
  useEffect(() => {
    console.log('Updated grassData:', grassData);
  }, [grassData]);

  const isDateAfterStartDate = (date: Date) => {
    return date >= START_DATE;
  };

  const getColorForActivity = (studyHour: number) => {
    if (studyHour === 0) return '#ebedf0'; // 연한 회색
    else if (studyHour >= 1 && studyHour <= 2) return '#c6e48b'; // 연한 초록
    else if (studyHour >= 3 && studyHour <= 4) return '#7bc96f'; // 중간 초록
    else if (studyHour >= 5 && studyHour <= 6) return '#239a3b'; // 진한 초록
    else if (studyHour >= 7 && studyHour <= 8)
      return '#196127'; // 아주 진한 초록
    else return '#196127'; // 8시간 초과 시에도 동일한 색상
  };

  const getColorForDate = (date: Date) => {
    if (!isDateAfterStartDate(date)) {
      return '#ebedf0';
    }

    // 날짜 형식을 두 자릿수로 보정
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const grassEntry = grassData.find(
      entry => Number(entry.month) === month && Number(entry.day) === day,
    );

    const studyHour = grassEntry ? grassEntry.studyHour : 0;

    return getColorForActivity(studyHour);
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

  return (
    <ScrollView horizontal>
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
