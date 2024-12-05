import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {getRecord} from '@/src/api/record';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import React, {useState, useEffect} from 'react';
import {ICONS} from '@/src/constants/image/icons';
import {StudyStatStyles} from './studyStatStyles';
import {Image} from 'react-native';
const StudyStats = ({userId}: {userId: number}) => {
  const authInfo = useRecoilValue(authState);

  const [userRecord, setRecord] = useState<any>(null);

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
    <Box style={StudyStatStyles.statsContainer}>
      {userRecord ? (
        <Box style={StudyStatStyles.rowContainer}>
          <Box>
            <Text style={StudyStatStyles.statsText}>
              <Image source={ICONS.CALENDAR} />
              최장{' '}
              <Text style={StudyStatStyles.highlight}>
                {userRecord.maxStreak}
              </Text>
              일 유지
            </Text>
            <Text style={StudyStatStyles.statsText}>
              <Image source={ICONS.STUDY_TIME} />총 공부시간{' '}
              <Text style={StudyStatStyles.highlight}>
                {Math.floor(userRecord.totalStudyTime)}
              </Text>
              시간
            </Text>
          </Box>
          <Box>
            <Image
              source={ICONS.JANDI_COLOR}
              style={StudyStatStyles.jandiColorInfo}
            />
          </Box>
        </Box>
      ) : (
        <Box style={StudyStatStyles.jandiColorInfo}>
          <Text>스트릭 정보가 없습니다. 첫 기록을 시작해보세요!</Text>
        </Box>
      )}
    </Box>
  );
};
export default StudyStats;
