import React, {useState, useRef} from 'react';
import {TouchableOpacity} from 'react-native';

import {Box, VStack, HStack, Text} from '@/components/ui/index.ts';

import {useNavigation} from '@react-navigation/native';

import {useLogin} from '@/src/hooks/useLogin';
import {LoginFormStyles} from './../LoginFrom/LoginFromStyle.ts';
import {LoginFormProps} from '@/src/components/types/LoginFormType/LoginFormType.ts';
import {InputField} from '../LoginFrom/InputField/index.tsx';

import {LOGIN_FORM_MESSAGE} from '@/src/constants/LoginFrom/LoginForm.ts';

const LoginForm: React.FC<LoginFormProps> = ({setIsLoading}) => {
  const navigation = useNavigation();
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);

  const {onLoginPress} = useLogin(setIsLoading);

  const handlePressLogin = () => {
    onLoginPress({
      email,
      password,
      isAutoLogin,
    });
  };

  return (
    <Box style={LoginFormStyles.loginFormContainer}>
      <VStack style={LoginFormStyles.loginFormInnerContainer}>
        <InputField
          label={LOGIN_FORM_MESSAGE.EMAIL.LABEL}
          placeholder={LOGIN_FORM_MESSAGE.EMAIL.PLACEHOLDER}
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <VStack style={LoginFormStyles.paddingBox} />
        <VStack style={LoginFormStyles.passwardContainer}>
          <InputField
            label={LOGIN_FORM_MESSAGE.PASSWORD.LABEL}
            placeholder={LOGIN_FORM_MESSAGE.PASSWORD.PLACEHOLDER}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            onSubmitEditing={handlePressLogin}
            ref={passwordInputRef}
          />
          <TouchableOpacity
            style={LoginFormStyles.findTextContainer}
            onPress={() =>
              navigation.navigate('FindPassword', {
                title: LOGIN_FORM_MESSAGE.FIND_PASSWORD,
              })
            }>
            <Text style={LoginFormStyles.findText}>
              {LOGIN_FORM_MESSAGE.FIND_PASSWORD}
            </Text>
          </TouchableOpacity>

          <HStack style={LoginFormStyles.autoLoginContainer}>
            <TouchableOpacity
              style={LoginFormStyles.customCheckboxContainer}
              onPress={() => setIsAutoLogin(!isAutoLogin)}>
              <Box
                style={[
                  LoginFormStyles.customCheckbox,
                  isAutoLogin && LoginFormStyles.customCheckboxChecked,
                ]}>
                {isAutoLogin && (
                  <Text style={LoginFormStyles.checkmark}>✓</Text>
                )}
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsAutoLogin(!isAutoLogin)}>
              <Text style={LoginFormStyles.optionText}>
                {LOGIN_FORM_MESSAGE.AUTO_LOGIN}
              </Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
        <VStack style={LoginFormStyles.paddingBox} />
        <TouchableOpacity
          style={LoginFormStyles.loginButton}
          onPress={handlePressLogin}>
          <Text style={LoginFormStyles.loginButtonText}>
            {LOGIN_FORM_MESSAGE.LOGIN_BUTTON_TEXT}
          </Text>
        </TouchableOpacity>
      </VStack>
    </Box>
  );
};

export default LoginForm;
