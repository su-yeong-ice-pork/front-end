import React, {useState} from 'react';

import {Text} from '@/components/ui/text';
import {Input} from '@/components/ui/input';
import {Button, ButtonText} from '@/components/ui/button';
import {VStack} from '@/components/ui/vstack';
import {HStack} from '@/components/ui/hstack';

import InputBox from './InputBox';
import {VerifyEmailStyles} from './VerifyEmailStyles';

const VerifyEmail = () => {
  const [askCode, setAskCode] = useState('코드 요청');

  return (
    <HStack>
      <VStack style={VerifyEmailStyles.inputWrapper}>
        <InputBox
          inputTitle="학교 이메일 인증"
          placeholderText="학교 이메일을 입력해주세요"
        />
        <Button style={VerifyEmailStyles.codeButton}>
          <ButtonText style={VerifyEmailStyles.requestCodeButtonText}>
            {askCode}
          </ButtonText>
        </Button>
      </VStack>
    </HStack>
  );
};

export default VerifyEmail;
