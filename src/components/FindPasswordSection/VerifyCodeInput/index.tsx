import React from 'react';

import {TouchableOpacity, TextInput} from 'react-native';

import {VerifyCodeInputProps} from '../../types/FindPasswordType/InputType';
import {VerifyCodeInputStyles} from './VerifyCodeInputStyles';

import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';

import {FIND_PASSWORD} from '@/src/constants/FindPassword/FindPassword';
import {formatTime} from '@/src/utils/FormatTime';

const VerifyCodeInput: React.FC<VerifyCodeInputProps> = ({
  code,
  handleCodeChange,
  timeLeft,
  verifiedEmail,
}) => {
  return (
    <Box style={VerifyCodeInputStyles.inputContainer}>
      <Box style={VerifyCodeInputStyles.inputRow}>
        <TextInput
          style={VerifyCodeInputStyles.codeInputBox}
          placeholder={FIND_PASSWORD.PLACE_HOLDER.CODE}
          placeholderTextColor={FIND_PASSWORD.PLACE_HOLDER.COLOR}
          value={code}
          onChangeText={handleCodeChange}
        />
        <Text style={VerifyCodeInputStyles.timerText}>
          {formatTime(timeLeft)}
        </Text>
        <TouchableOpacity
          style={VerifyCodeInputStyles.verifyButton}
          onPress={verifiedEmail}>
          <Text style={VerifyCodeInputStyles.verifyButtonText}>확인</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default VerifyCodeInput;
