import React, {useState, useEffect, useRef} from 'react';
import {Box} from '@/components/ui/box';

import Header from '@/src/components/Header/index.tsx';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SignUpHeader from '@/src/components/SignUp/SignUpHeader/index.tsx';

import VerifyEmail from '@/src/components/SignUp/VerifyEmail/index.tsx';
import RegisterDepart from '@/src/components/SignUp/RegisterDepart/index.tsx';
import InputPassword from '@/src/components/SignUp/InputPassword/index.tsx';
import NickName from '@/src/components/SignUp/NickName/index.tsx';
import SaveButton from '@/src/components/SignUp/SaveButton/index.tsx';

import {SignUpScreenStyles} from './SignUpScreenStyles';

const SignUpScreen = () => {
  return (
    <Box style={SignUpScreenStyles.container}>
      <Header Title="회원가입" />
      <KeyboardAwareScrollView
        contentContainerStyle={SignUpScreenStyles.formContainer}
        enableOnAndroid={true}
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled">
        <SignUpHeader />
        <Box style={SignUpScreenStyles.inputContainer}>
          <VerifyEmail />
          <RegisterDepart />
          <InputPassword />
          <NickName />
        </Box>
      </KeyboardAwareScrollView>
      <SaveButton />
    </Box>
  );
};

export default SignUpScreen;
