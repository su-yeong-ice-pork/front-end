import React from 'react';

import StudyItem from './StudyItem/index';
import {StudyListStyles} from './StudyListStyles';

import {Box} from '@/components/ui/box';
import {StudyGroupListProps} from '../../types/StudyGroupScreenType/StudyGroupDataType';

const StudyList: React.FC<StudyGroupListProps> = ({studyData}) => {
  return (
    <Box style={StudyListStyles.container}>
      {studyData.map((study, index) => (
        <Box key={index}>
          <StudyItem
            name={study.studyName}
            id={study.id}
            totalStudyTime={study.totalStudyTime}
            memberCount={study.memberCount}
          />
          {index < studyData.length && (
            <Box style={StudyListStyles.separator} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default StudyList;
