import React from 'react';
import {TextInput} from 'react-native';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Button, ButtonText} from '@/components/ui/button';
import {VerifyCodeStyles} from './VerifyCodeStyles';
import {VerifyCodeProps} from '@/src/components/types/SignUpType/VerifyEmail';
import {formatTime} from '@/src/utils/FormatTime';

const VerifyCode: React.FC<VerifyCodeProps> = ({
  timeLeft,
  code,
  setCode,
  onVerify,
}) => {
  return (
    <Box style={VerifyCodeStyles.inputContainer}>
      <Box style={VerifyCodeStyles.inputRow}>
        <TextInput
          style={VerifyCodeStyles.inputText}
          placeholder="인증 코드를 입력하세요"
          value={code}
          onChangeText={setCode}
        />
        <Text style={VerifyCodeStyles.timerText}>{formatTime(timeLeft)}</Text>
        <Button style={VerifyCodeStyles.verifyButton} onPress={onVerify}>
          <ButtonText style={VerifyCodeStyles.verifyButtonText}>
            확인
          </ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyCode;
