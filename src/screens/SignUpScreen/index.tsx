import React from 'react';
import {Box} from '@/components/ui/box';
import Header from '@/src/components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SignUpHeader from '@/src/components/SignUp/SignUpHeader';
import {SafeAreaView} from '@/components/ui/safe-area-view';
import VerifyEmail from '@/src/components/SignUp/VerifyEmail';
import RegisterDepart from '@/src/components/SignUp/RegisterDepart';
import InputPassword from '@/src/components/SignUp/InputPassword';
import NickName from '@/src/components/SignUp/NickName';
import SaveButton from '@/src/components/SignUp/SaveButton';
import {SignUpScreenStyles} from './SignUpScreenStyles';

const SignUpScreen = () => {
  return (
    <SafeAreaView style={SignUpScreenStyles.container}>
      <Header Title="회원가입" />
      <KeyboardAwareScrollView
        contentContainerStyle={SignUpScreenStyles.formContainer}
        enableOnAndroid
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
    </SafeAreaView>
  );
};

export default SignUpScreen;
