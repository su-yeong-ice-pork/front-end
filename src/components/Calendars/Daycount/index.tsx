import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {DayCountStyle} from './daycountStyle';
import {getRecord} from '@/src/api/record';
import {useRecoilValue} from 'recoil';
import {DayCountProps} from '../../types/CalendarType/DayCountType';
import authState from '@/src/recoil/authAtom';
import React, {useState, useEffect} from 'react';
const Daycount = ({userId}: {userId: number}) => {
  const authInfo = useRecoilValue(authState);

  const [userRecord, setRecord] = useState<DayCountProps | null>(null);

  const fetchRecordData = async () => {
    const userRecords = await getRecord(userId, authInfo.authToken);
    if (userRecords) {
      setRecord(userRecords);
    }
  };

  useEffect(() => {
    fetchRecordData();
  }, []);

  return (
    <>
      {userRecord ? (
        <Box style={DayCountStyle.currentDaySection}>
          <Text style={DayCountStyle.currentDayText}>
            현재
            <Text style={DayCountStyle.dayCount}>
              {' '}
              {userRecord.currentStreak}
            </Text>
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
