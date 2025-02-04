import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';
import BottomBar from '../../components/BottomBar/index';
import Header from '@/src/components/Header';
import {TITLE} from '@/src/constants/CreateStudy/createStudy';
import {CreateStudyScreenStyles} from '@/src/screens/CreateStudyScreen/CreateStudyScreenStyles.ts';
import CreateStudyForm from '@/src/components/CreateStudyForm';

const CreateStudyScreen = ({}) => {
  return (
    <SafeAreaView style={CreateStudyScreenStyles.safeArea}>
      <ScrollView>
      <Header Title={TITLE} />
      <CreateStudyForm/>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
};

export default CreateStudyScreen;
