import React from 'react';

import BottomBar from '../../components/BottomBar/index';
import Header from '../../components/Header';

import {RandomStudyDetailScreenStyles} from './RandomStudyDetailScreenStyles';
import {STUDY_GROUP} from '@/src/constants/StudyGroup/study';

import {SafeAreaView} from '@/components/ui/safe-area-view';
import {Text} from '@/components/ui';
import {useRoute} from '@react-navigation/native';
import {StudyDetailScreenRouteProp} from '@/src/components/types/StudyDetailType/StudyDetailType.ts';

const RandomStudyDetailScreen = () => {
  const route = useRoute<StudyDetailScreenRouteProp>();
  const {studyId} = route.params;

  return (
    <SafeAreaView style={RandomStudyDetailScreenStyles.safeAreaContainer}>
      <Header Title={STUDY_GROUP.TITLE} />
      <Text>랜덤 스터디 디테일 화면 나올 예정임용{studyId}</Text>
      <BottomBar />
    </SafeAreaView>
  );
};

export default RandomStudyDetailScreen;
