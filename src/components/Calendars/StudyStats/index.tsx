import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import React, {useState, useEffect} from 'react';
import {ICONS} from '@/src/constants/image/icons';
import {StudyStatStyles} from './studyStatStyles';
import {Image} from 'react-native';
import {RecordType} from '@/src/api/record/getRecordDataType';

const StudyStats = ({userId, record}: {userId: number; record: RecordType}) => {
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
