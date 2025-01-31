import React, {useState} from 'react';

import {Box} from '@/components/ui/box';
import {Button} from '@/components/ui/button';
import {Image} from '@/components/ui/image';
import {VStack} from '@/components/ui/vstack';
import {HStack} from '@/components/ui/hstack';

import {InputPasswordStyles} from './InputPasswordStyles';

import InputBox from '../VerifyEmail/InputBox';
import {ICONS} from '@/src/constants/image/icons';

import {passwordRegex} from '@/src/constants/Regex/password';
import {PASSWORD, PasswordInputBox} from '@/src/constants/SignUp/Password';
import {InputPasswordprops} from '../../types/SignUpType/InputPassword';
import {MAGIC_NUMBER} from '@/src/constants/Number/MagicNumber';

const InputPassword = () => {
  const [inputPassword, setInputPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const deletePassword = () => {
    setInputPassword('');
  };

  const validationPassword = ({password}: InputPasswordprops) => {
    if (!passwordRegex.test(password)) {
      setErrorMessage(PASSWORD.ERRORMESSAGE);
      return false;
    } else {
      setErrorMessage(PASSWORD.SOLVED_ERROR);
      return true;
    }
  };

  return (
    <Box>
      <HStack>
        <VStack style={InputPasswordStyles.inputWrapper}>
          <InputBox
            inputTitle={PasswordInputBox.TITLE}
            placeholderText={PasswordInputBox.PLACEHOLDER}
            value={inputPassword}
            setValue={setInputPassword}
          />
          {inputPassword.length > MAGIC_NUMBER.MIN_PASSWORD && (
            <Button
              style={InputPasswordStyles.codeButton}
              onPress={deletePassword}>
              <Image
                alt={PasswordInputBox.IMGALT}
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
