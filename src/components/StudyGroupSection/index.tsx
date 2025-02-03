import React from 'react';

import {StudyGroupListProps} from '../types/StudyGroupScreenType/StudyGroupDataType';
import {StudyGroupSectionStyles} from './StudyGroupSectionStyles';

import StudyList from './StudyList/index';
import StudyHeader from './StudyHeader/index';
import CreateStudyButton from './CreateStudyButton/index';

import {Box} from '@/components/ui/box';
import {ScrollView} from '@/components/ui/scroll-view';

const StudyGroupSection: React.FC<StudyGroupListProps> = ({studyData}) => {
  return (
    <Box style={StudyGroupSectionStyles.container}>
      <ScrollView contentContainerStyle={StudyGroupSectionStyles.main}>
        <StudyHeader />
        <StudyList studyData={studyData} />
      </ScrollView>
      <Box style={StudyGroupSectionStyles.buttonContainer}>
        <CreateStudyButton />
      </Box>
    </Box>
  );
};

export default StudyGroupSection;
