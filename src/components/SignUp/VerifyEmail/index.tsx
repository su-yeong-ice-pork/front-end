import React, {useState, useEffect} from 'react';

import {Box} from '@/components/ui/box';
import {Button, ButtonText} from '@/components/ui/button';
import {VStack} from '@/components/ui/vstack';

import {VerifyEmailStyles} from './VerifyEmailStyles';

import InputBox from './InputBox';
import ErrorMessage from './ErrorMessage';
import VerifyCode from './VerifyCode';

import {EMAIL_REGEX} from '@/src/constants/regex.ts';
import {
  ASKCODE,
  EMAIL,
  VerifyEmailInputBox,
} from '@/src/constants/SignUp/VerifyEmail';

const VerifyEmail = () => {
  const [askCode, setAskCode] = useState<string>(ASKCODE.ASK);
  const [email, setEmail] = useState<string>(EMAIL.SOLVED_ERROR);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>(
    EMAIL.SOLVED_ERROR,
  );

  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isActive, setIsActive] = useState<Boolean>(false);

  const handleEmail = async () => {
    if (!email) {
      setEmailErrorMessage(EMAIL.ERRORMESSAGE_EMPTY);
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailErrorMessage(EMAIL.ERRORMESSAGE_PUSAN);
      return;
    }
    setEmailErrorMessage(EMAIL.SOLVED_ERROR);
    setAskCode(ASKCODE.RECALL);
    setIsActive(true);
  };

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setAskCode(ASKCODE.ASK);
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  return (
    <Box>
      <VStack style={VerifyEmailStyles.inputWrapper}>
        <Box>
          <InputBox
            inputTitle={VerifyEmailInputBox.TITLE}
            placeholderText={VerifyEmailInputBox.PLACEHOLDER}
            value={email}
            setValue={setEmail}
          />
          <Button style={VerifyEmailStyles.codeButton} onPress={handleEmail}>
            <ButtonText style={VerifyEmailStyles.requestCodeButtonText}>
              {askCode}
            </ButtonText>
          </Button>
        </Box>
      </VStack>
      {emailErrorMessage && <ErrorMessage errorMessage={emailErrorMessage} />}
      {isActive && <VerifyCode timeLeft={timeLeft} />}
    </Box>
  );
};

export default VerifyEmail;
