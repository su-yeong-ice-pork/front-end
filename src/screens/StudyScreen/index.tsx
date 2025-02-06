import React from 'react';

import BottomBar from '../../components/BottomBar/index';
import Header from '../../components/Header';

import {StudyScreenStyles} from './StudyScreenStyles';
import {STUDY_GROUP} from '@/src/constants/StudyGroup/study';

import {SafeAreaView} from '@/components/ui/safe-area-view';
import StudyGroupSection from '@/src/components/StudyGroupSection/index';
import {useStudies} from '@/src/hooks/useStudies';
import Loader from '@/src/components/Loader';
import {Text} from '@/components/ui';

const StudyScreen = () => {
  const {data: studyData, isLoading, error} = useStudies();

  if (isLoading) {
    return (
      <SafeAreaView style={StudyScreenStyles.safeAreaContainer}>
        <Loader />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={StudyScreenStyles.safeAreaContainer}>
        <Text>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={StudyScreenStyles.safeAreaContainer}>
      <Header Title={STUDY_GROUP.TITLE} />
      <StudyGroupSection studyData={studyData || []} />
      <BottomBar />
    </SafeAreaView>
  );
};

export default StudyScreen;
