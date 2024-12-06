import React, {useState, useEffect} from 'react';

import {Text} from '@/components/ui/text';
import {Input} from '@/components/ui/input';
import {Box} from '@/components/ui/box';
import {Button, ButtonText} from '@/components/ui/button';
import {VStack} from '@/components/ui/vstack';
import {HStack} from '@/components/ui/hstack';

import {VerifyEmailStyles} from './VerifyEmailStyles';

import InputBox from './InputBox';
import ErrorMessage from './ErrorMessage';
import VerifyCode from './VerifyCode';

const VerifyEmail = () => {
  const [askCode, setAskCode] = useState<string>('코드 요청');
  const [email, setEmail] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

  // 타이머
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isActive, setIsActive] = useState<Boolean>(false);

  const handleEmail = async () => {
    if (!email) {
      setEmailErrorMessage('이메일을 입력해주세요');
      return;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@pusan\.ac\.kr$/;
    if (!emailRegex.test(email)) {
      setEmailErrorMessage('pusan.ac.kr 계정을 사용해주세요.');
      return;
    }
    setEmailErrorMessage('');
    setAskCode('재요청');
    setIsActive(true);
  };

  // 타이머 작동 함수
  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setAskCode('코드 요청');
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  return (
    <Box>
      <HStack>
        <VStack style={VerifyEmailStyles.inputWrapper}>
          <InputBox
            inputTitle="학교 이메일 인증"
            placeholderText="학교 이메일을 입력해주세요"
            value={email}
            setValue={setEmail}
          />
          <Button style={VerifyEmailStyles.codeButton} onPress={handleEmail}>
            <ButtonText style={VerifyEmailStyles.requestCodeButtonText}>
              {askCode}
            </ButtonText>
          </Button>
        </VStack>
      </HStack>
      {emailErrorMessage && <ErrorMessage errorMessage={emailErrorMessage} />}
      {isActive && <VerifyCode timeLeft={timeLeft} />}
    </Box>
  );
};

export default VerifyEmail;
