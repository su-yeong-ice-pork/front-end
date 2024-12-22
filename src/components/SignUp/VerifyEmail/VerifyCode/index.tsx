import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {TextInput} from 'react-native';
import {VerifyCodeStyles} from './VerifyCodeStyles';
import ErrorMessage from '../ErrorMessage';
import {Button, ButtonText} from '@/components/ui/button';

const VerifyCode = ({timeLeft = 1000}) => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [showError, setShowError] = useState<Boolean>(true);

  const formatTime = seconds => {
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
          placeholder="메일로 전송된 코드를 입력해주세요."
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
      {showError && <ErrorMessage errorMessage="인증 코드를 입력해주세요." />}
    </Box>
  );
};

export default VerifyCode;
