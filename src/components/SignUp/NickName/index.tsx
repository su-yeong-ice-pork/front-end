import React, {useState} from 'react';

import {Box} from '@/components/ui/box';
import {Button, ButtonText} from '@/components/ui/button';
import {VStack} from '@/components/ui/vstack';

import {NickNameStyles} from './NicknameStyles';
import {NickName} from '@/src/constants/SignUp/NickName';

import InputBox from '../VerifyEmail/InputBox';

const VerifyEmail = () => {
  const [name, setName] = useState<string>('');

  return (
    <Box>
      <VStack style={NickNameStyles.inputWrapper}>
        <InputBox
          inputTitle={NickName.TITLE}
          placeholderText={NickName.PLACEHOLDER}
          value={name}
          setValue={setName}
        />
        <Button style={NickNameStyles.codeButton}>
          <ButtonText style={NickNameStyles.requestCodeButtonText}>
            중복확인
          </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default VerifyEmail;
