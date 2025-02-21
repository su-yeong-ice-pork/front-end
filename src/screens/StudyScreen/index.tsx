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
import {Box} from '@/components/ui';
import CreateStudyButton from '@/src/components/StudyGroupSection/CreateStudyButton';
import {ScrollView} from 'react-native';

const randomStudyData = [
  {
    id: 1,
    studyName: '아침 9시 스터디',
    memberCount: 6,
    totalStudyTime: 10,
  },
  {
    id: 2,
    studyName: '오전 11시 스터디',
    memberCount: 6,
    totalStudyTime: 10,
  },
  {
    id: 3,
    studyName: '오후 1시 스터디',
    memberCount: 6,
    totalStudyTime: 10,
  },
];

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
      <ScrollView contentContainerStyle={StudyScreenStyles.main}>
        {/*랜덤 스터디*/}
        <StudyGroupSection studyData={randomStudyData || []} isRandom={true} />
        {/*정규 스터디*/}
        <StudyGroupSection studyData={studyData || []} isRandom={false} />
      </ScrollView>
      <Box style={StudyScreenStyles.buttonContainer}>
        <CreateStudyButton />
      </Box>
      <BottomBar />
    </SafeAreaView>
  );
};

export default StudyScreen;
