import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {TextInput} from 'react-native';
import {VerifyCodeStyles} from './VerifyCodeStyles';
import ErrorMessage from '../ErrorMessage';
import {Button, ButtonText} from '@/components/ui/button';

import {
  VerifyCodeProps,
  SecondsProps,
} from '@/src/components/types/SignUpType/VerifyEmail';
import {
  VERIFYCODE,
  VERIFICATION,
  VerifyCodeInputBox,
} from '@/src/constants/SignUp/VerifyEmail';

const VerifyCode = ({timeLeft = 1000}: VerifyCodeProps) => {
  const [verificationCode, setVerificationCode] = useState<string>(
    VERIFICATION.DEFAULT_CODE,
  );
  const [showError, setShowError] = useState<Boolean>(true);

  const formatTime = ({seconds}: SecondsProps) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  const verifyCode = () => {
    if (!verificationCode) {
      setShowError(true);
      return;
    }
    setShowError(false);
  };

  return (
    <Box style={VerifyCodeStyles.inputContainer}>
      <Box style={VerifyCodeStyles.inputRow}>
        <TextInput
          style={VerifyCodeStyles.inputText}
          placeholder={VerifyCodeInputBox.PLACEHOLDER}
          value={verificationCode}
          onChangeText={text => {
            setVerificationCode(text);
          }}
        />
        <Text style={VerifyCodeStyles.timerText}>{formatTime(timeLeft)}</Text>
        <Button style={VerifyCodeStyles.verifyButton} onPress={verifyCode}>
          <ButtonText style={VerifyCodeStyles.verifyButtonText}>
            확인
          </ButtonText>
        </Button>
      </Box>
      {showError && <ErrorMessage errorMessage={VERIFYCODE.ERRORMESSAGE} />}
    </Box>
  );
};

export default VerifyCode;
