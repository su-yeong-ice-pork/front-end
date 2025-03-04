import React from 'react';

import {RandomStudyDetailHeaderStyles} from './RandomStudyDetailHeaderStyles.ts';
import {RANDOM_TITLE_HEADER} from '@/src/constants/StudyGroup/randomStudy.ts';
import {RandomStudyDetailHeaderProps} from '@/src/components/types/RandomStudyDetailType/RandomStudyDetailType.ts';

import {Text,Box,HStack, VStack} from '@/components/ui';
import DashLine from '../../DashLine';


const RandomStudyDetailHeader: React.FC<RandomStudyDetailHeaderProps> = ({
  studyDetail,
}) => {
  return (
    <>
      <HStack style={RandomStudyDetailHeaderStyles.studyHeader}>
        <VStack style={RandomStudyDetailHeaderStyles.studyInfo}>
          <Box style={RandomStudyDetailHeaderStyles.attendanceTimeBox}>
            <Text style={RandomStudyDetailHeaderStyles.attendanceTimeText}>
              {studyDetail.attendanceTime}
            </Text>
          </Box>
          <Text style={RandomStudyDetailHeaderStyles.studyTitle}>
            {studyDetail.studyName}
          </Text>
          <Text style={RandomStudyDetailHeaderStyles.totalStudyTime}>
            {RANDOM_TITLE_HEADER.TOTAL_TIME}
            <Text style={RandomStudyDetailHeaderStyles.totalStudyTimeValue}>
              {studyDetail.totalStudyTime}
            </Text>
            {RANDOM_TITLE_HEADER.TIME}
          </Text>
        </VStack>
      </HStack>

      <DashLine />

      <HStack style={RandomStudyDetailHeaderStyles.membersHeader}>
        <Text style={RandomStudyDetailHeaderStyles.membersTitle}>
          {RANDOM_TITLE_HEADER.MEMBERS_TITLE}
        </Text>
        <Text style={RandomStudyDetailHeaderStyles.membersComment}>
          {RANDOM_TITLE_HEADER.MEMBERS_COMMENT}
        </Text>
      </HStack>
    </>
  );
};

export default RandomStudyDetailHeader;
