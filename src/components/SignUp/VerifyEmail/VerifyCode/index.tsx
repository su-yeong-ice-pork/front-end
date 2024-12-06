import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import {VerifyCodeStyles} from './VerifyCodeStyles';
import ErrorMessage from '../ErrorMessage';

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
    <View style={VerifyCodeStyles.inputContainer}>
      <View style={VerifyCodeStyles.inputRow}>
        <TextInput
          style={VerifyCodeStyles.inputText}
          placeholder="메일로 전송된 코드를 입력해주세요."
          value={verificationCode}
          onChangeText={text => {
            setVerificationCode(text);
          }}
        />
        <Text style={VerifyCodeStyles.timerText}>{formatTime(timeLeft)}</Text>
        <TouchableOpacity
          style={VerifyCodeStyles.verifyButton}
          onPress={verifyCode}>
          <Text style={VerifyCodeStyles.verifyButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
      {showError && <ErrorMessage errorMessage="인증 코드를 입력해주세요." />}
    </View>
  );
};

export default VerifyCode;
