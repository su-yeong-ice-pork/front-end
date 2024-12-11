import React from 'react';

import {TouchableOpacity, TextInput} from 'react-native';

import {ChangePasswordProps} from '../../types/FindPasswordType/InputType';
import {ChangePasswordStyles} from './ChangePasswordStyles';

import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';
import {Image} from '@/components/ui/image';

import {FIND_PASSWORD} from '@/src/constants/FindPassword/FindPassword';
import {ICONS} from '@/src/constants/image/icons';
import {MAGIC_NUMBER} from '@/src/constants/Number/MagicNumber';

import ErrorMessage from '../ErrorMessage';

const ChangePassword: React.FC<ChangePasswordProps> = ({
  resetPasswordInput,
  handleResetPasswordChange,
  deletePassword,
  errorMessage,
}) => {
  return (
    <Box style={ChangePasswordStyles.inputContainer2}>
      <Text style={ChangePasswordStyles.inputLabel}>
        비밀번호 재설정 <Text style={ChangePasswordStyles.starmark}>*</Text>
      </Text>
      <Box style={ChangePasswordStyles.inputWrapper}>
        <TextInput
          style={ChangePasswordStyles.inputBox}
          placeholder={FIND_PASSWORD.PLACE_HOLDER.FIND_PASSWORD}
          placeholderTextColor={FIND_PASSWORD.PLACE_HOLDER.COLOR}
          secureTextEntry
          value={resetPasswordInput}
          onChangeText={handleResetPasswordChange}
        />
        {resetPasswordInput.length > MAGIC_NUMBER.ZERO && (
          <TouchableOpacity
            style={ChangePasswordStyles.resetButton}
            onPress={deletePassword}>
            <Image
              source={ICONS.RESET_BUTTON}
              style={ChangePasswordStyles.clearIcon}
              alt={FIND_PASSWORD.PLACE_HOLDER.FIND_PASSWORD}
            />
          </TouchableOpacity>
        )}
      </Box>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </Box>
  );
};

export default ChangePassword;
