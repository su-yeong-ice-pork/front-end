import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {DayCountStyle} from './daycountStyle';
import useRecord from '@/src/hooks/calendar/useRecord';
import React, {useState, useEffect} from 'react';

const Daycount = ({userId}: {userId: number}) => {
  const {record, isLoading, error} = useRecord(userId);
  console.log(record);
  if (isLoading) {
    return <Text>로딩 중...</Text>;
  }

  if (error) {
    return <Text>데이터를 불러오는 데 실패했습니다</Text>;
  }

  return (
    <>
      {record ? (
        <Box style={DayCountStyle.currentDaySection}>
          <Text style={DayCountStyle.currentDayText}>
            현재
            <Text style={DayCountStyle.dayCount}> {record.currentStreak}</Text>
            일 째!
          </Text>
        </Box>
      ) : (
        <Text style={DayCountStyle.notDayCount}>
          아직 기록된 스트릭 정보가 없습니다.
        </Text>
      )}
    </>
  );
};

export default Daycount;
