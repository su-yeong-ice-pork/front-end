import React from 'react';
import {Box} from '@/components/ui/box';
import {Button, ButtonText} from '@/components/ui/button';
import {VStack} from '@/components/ui/vstack';
import {VerifyEmailStyles} from './VerifyEmailStyles';
import InputBox from './InputBox';
import VerifyCode from './VerifyCode';
import {VerifyEmailInputBox} from '@/src/constants/SignUp/VerifyEmail';
import {useVerifyEmail} from '@/src/hooks/useVerifyEmail';
import {useRecoilState} from 'recoil';
import signUpState from '@/src/recoil/signUpAtom';

const VerifyEmail = () => {
  const [signUp, setSignUp] = useRecoilState(signUpState);
  const {
    askCode,
    isActive,
    timeLeft,
    requestEmailCode,
    verifyEmailCode,
    code,
    setCode,
  } = useVerifyEmail();

  return (
    <Box>
      <VStack style={VerifyEmailStyles.inputWrapper}>
        <Box>
          <InputBox
            inputTitle={VerifyEmailInputBox.TITLE}
            placeholderText={VerifyEmailInputBox.PLACEHOLDER}
            value={signUp.email}
            setValue={email => setSignUp({...signUp, email})}
          />
          <Button
            style={VerifyEmailStyles.codeButton}
            onPress={() => requestEmailCode()}>
            <ButtonText style={VerifyEmailStyles.requestCodeButtonText}>
              {askCode}
            </ButtonText>
          </Button>
        </Box>
      </VStack>
      {isActive && (
        <VerifyCode
          timeLeft={timeLeft}
          code={code}
          setCode={setCode}
          onVerify={() => verifyEmailCode(code)}
        />
      )}
    </Box>
  );
};

export default VerifyEmail;
