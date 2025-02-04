import React, {useState} from 'react';

import {SafeAreaView} from 'react-native';
import BottomBar from '../../components/BottomBar/index';
import Header from '@/src/components/Header';
import {TITLE} from '@/src/constants/CreateStudy/createStudy';
import {CreateStudyScreenStyles} from '@/src/screens/CreateStudyScreen/CreateStudyScreenStyles.ts';
import CreateStudyForm from "@/src/components/CreateStudyForm";

const CreateStudyScreen = ({}) => {
  return (
    <SafeAreaView style={CreateStudyScreenStyles.safeArea}>
      <Header Title={TITLE} />
      <CreateStudyForm/>
      <BottomBar />
    </SafeAreaView>
  );
};

export default CreateStudyScreen;
