import React, {useState} from 'react';

import {Box} from '@/components/ui/box';
import {Button, ButtonText} from '@/components/ui/button';
import {VStack} from '@/components/ui/vstack';
import {HStack} from '@/components/ui/hstack';

import {NickNameStyles} from './NicknameStyles';

import InputBox from '../VerifyEmail/InputBox';

const VerifyEmail = () => {
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const chkDuplicate = () => {
    // setErrorMessage('멤버가 중복됩니다');
  };

  return (
    <Box>
      <HStack>
        <VStack style={NickNameStyles.inputWrapper}>
          <InputBox
            inputTitle="이름(닉네임) 입력"
            placeholderText="1~8자리 입력/한글 영어, 숫자 조합합"
            value={name}
            setValue={setName}
          />
          <Button style={NickNameStyles.codeButton} onPress={chkDuplicate}>
            <ButtonText style={NickNameStyles.requestCodeButtonText}>
              중복확인
            </ButtonText>
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
};

export default VerifyEmail;
