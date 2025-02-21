import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import React, {useState, useEffect} from 'react';
import {ICONS} from '@/src/constants/image/icons';
import {StudyStatStyles} from './studyStatStyles';
import {Image} from 'react-native';
import useRecord from '@/src/hooks/calendar/useRecord';

const StudyStats = ({userId}: {userId: number}) => {
  const {record, isLoading, error} = useRecord(userId);

  if (isLoading) {
    return <Text>로딩 중...</Text>;
  }

  if (error) {
    return <Text>데이터를 불러오는 데 실패했습니다</Text>;
  }

  return (
    <Box style={StudyStatStyles.statsContainer}>
      {record ? (
        <Box style={StudyStatStyles.rowContainer}>
          <Box>
            <Text style={StudyStatStyles.statsText}>
              <Image source={ICONS.CALENDAR} />
              최장{' '}
              <Text style={StudyStatStyles.highlight}>{record.maxStreak}</Text>
              일 유지
            </Text>
            <Text style={StudyStatStyles.statsText}>
              <Image source={ICONS.STUDY_TIME} />총 공부시간{' '}
              <Text style={StudyStatStyles.highlight}>
                {Math.floor(record.totalStudyTime)}
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
