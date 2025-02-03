import React, {useState} from 'react';

import {EditProfileScreenStyles} from '@/src/screens/EditProfileScreen/EditProfileScreenStyles.ts';

import {SafeAreaView} from 'react-native';
import {Box} from '@/components/ui';
import BottomBar from '../../components/BottomBar/index';

const CreateStudyScreen = ({}) => {
  return (
    <SafeAreaView style={EditProfileScreenStyles.safeArea}>
      <Box>
      </Box>
      <BottomBar />
    </SafeAreaView>
  );
};

export default CreateStudyScreen;
