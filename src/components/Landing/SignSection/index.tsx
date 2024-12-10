import React from 'react';

import {SignSectionStyles} from './SignSectionStyles';
import {SignSectionProps} from '../../types/LandingType/SignType';

import {TouchableOpacity} from 'react-native';

import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';

const SignSection: React.FC<SignSectionProps> = ({
  handleLogin,
  handleSignUp,
}) => {
  return (
    <VStack style={SignSectionStyles.buttonsContainer}>
      <TouchableOpacity
        style={SignSectionStyles.rectangle4380}
        onPress={handleSignUp}>
        <Text style={SignSectionStyles.signUpText}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={SignSectionStyles.rectangle4381}
        onPress={handleLogin}>
        <Text style={SignSectionStyles.loginText}>
          기존 계정으로 로그인하기
        </Text>
      </TouchableOpacity>
    </VStack>
  );
};

export default SignSection;
