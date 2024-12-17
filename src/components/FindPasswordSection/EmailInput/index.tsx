import React from 'react';

import {TouchableOpacity, TextInput} from 'react-native';

import {EmailInputProps} from '../../types/FindPasswordType/InputType';
import {EmailInputStyles} from './EmailInputStyles';

import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';
import {Image} from '@/components/ui/image';

import {ICONS} from '@/src/constants/image/icons';
import {FIND_PASSWORD} from '@/src/constants/FindPassword/FindPassword';

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  handleEmailChange,
  handleRequire,
  askCode,
  emailError,
  isActive,
}) => {
  return (
    <Box style={EmailInputStyles.inputContainer}>
      <Text style={EmailInputStyles.inputLabel}>
        학교 이메일 인증 <Text style={EmailInputStyles.starmark}>*</Text>
      </Text>
      <Box style={EmailInputStyles.inputWrapper}>
        <TextInput
          style={EmailInputStyles.inputBox}
          placeholder={FIND_PASSWORD.PLACE_HOLDER.EMAIL}
          placeholderTextColor={FIND_PASSWORD.PLACE_HOLDER.NAME}
          value={email}
          onChangeText={handleEmailChange}
        />
        <TouchableOpacity
          style={EmailInputStyles.codeButton}
          onPress={handleRequire}>
          <Text style={EmailInputStyles.requestCodeButtonText}>{askCode}</Text>
        </TouchableOpacity>
      </Box>
      {emailError ? (
        <Box style={EmailInputStyles.iconAndTextContainer}>
          <Image
            source={ICONS.I_ICON}
            style={EmailInputStyles.setiIcon}
            alt={FIND_PASSWORD.PLACE_HOLDER.NAME}
          />
          <Text style={EmailInputStyles.activeText}>{emailError}</Text>
        </Box>
      ) : null}
      {isActive && (
        <Box style={EmailInputStyles.iconAndTextContainer}>
          <Image
            source={ICONS.I_ICON}
            style={EmailInputStyles.setiIcon}
            alt={FIND_PASSWORD.PLACE_HOLDER.NAME}
          />
          <Text style={EmailInputStyles.activeText}>
            메일이 오지 않으셨나요? 재요청 버튼을 눌러보세요.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default EmailInput;
