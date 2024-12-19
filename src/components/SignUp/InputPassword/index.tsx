import React, {useState, useEffect} from 'react';

import {Text} from '@/components/ui/text';
import {Input} from '@/components/ui/input';
import {Box} from '@/components/ui/box';
import {Button, ButtonText} from '@/components/ui/button';
import {Image} from '@/components/ui/image';
import {VStack} from '@/components/ui/vstack';
import {HStack} from '@/components/ui/hstack';

import {InputPasswordStyles} from './InputPasswordStyles';

import InputBox from '../VerifyEmail/InputBox';
import ErrorMessage from '../VerifyEmail/ErrorMessage';
import {ICONS} from '@/src/constants/image/icons';

const InputPassword = () => {
  const [inputPassword, setInputPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const deletePassword = () => {
    setInputPassword('');
  };

  // 비밀번호 조건 확인
  const validationPassword = password => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        '비밀번호는 8~16자 영문, 숫자, 특수문자를 포함해야 합니다.',
      );
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  return (
    <Box>
      <HStack>
        <VStack style={InputPasswordStyles.inputWrapper}>
          <InputBox
            inputTitle="비밀번호 입력"
            placeholderText="8~16자리 입력/영어, 숫자, 특수문자 조합"
            value={inputPassword}
            setValue={setInputPassword}
          />
          {inputPassword.length > 0 && (
            <Button
              style={InputPasswordStyles.codeButton}
              onPress={deletePassword}>
              <Image
                size="sm"
                alt="delete"
                style={InputPasswordStyles.deleteImage}
                source={ICONS.RESET_BUTTON}
              />
            </Button>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default InputPassword;
