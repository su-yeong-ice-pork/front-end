import React from 'react';

import {StudyGroupListProps} from '../../types/StudyGroupScreenType/StudyGroupDataType';
import {StudyGroupSectionStyles} from '../StudyGroupSectionStyles';

import StudyList from '../StudyList/index';
import RandomStudyHeader from '../RandomStudyHeader/index';

import {Box} from '@/components/ui/box';

const RandomStudyGroupSection: React.FC<StudyGroupListProps> = ({
  studyData,
}) => {
  return (
    <Box style={StudyGroupSectionStyles.container}>
      <Box style={StudyGroupSectionStyles.main}>
        <RandomStudyHeader />
        <StudyList studyData={studyData} />
      </Box>
    </Box>
  );
};

export default RandomStudyGroupSection;
