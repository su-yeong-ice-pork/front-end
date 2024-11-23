import React from 'react';

import BottomBar from '../../components/BottomBar/index';
import Header from '../../components/Header';

import {StudyScreenStyles} from './StudyScreenStyles';
import {STUDY_GROUP, studyData} from '@/src/constants/StudyGroup/study';

import {SafeAreaView} from '@/components/ui/safe-area-view';
import StudyGroupSection from '@/src/components/StudyGroupSection/index';

const StudyScreen = () => {
  return (
    <SafeAreaView style={StudyScreenStyles.safeAreaContainer}>
      <Header Title={STUDY_GROUP.TITLE} />
      <StudyGroupSection studyData={studyData} />
      <BottomBar />
    </SafeAreaView>
  );
};

export default StudyScreen;
