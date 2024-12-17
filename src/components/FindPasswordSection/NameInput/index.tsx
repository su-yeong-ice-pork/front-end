import React from 'react';

import {TouchableOpacity, TextInput} from 'react-native';

import {NameInputProps} from '../../types/FindPasswordType/InputType';
import {NameInputStyles} from './NameInputStyles';

import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';
import {Image} from '@/components/ui/image';

import {ICONS} from '@/src/constants/image/icons';
import {FIND_PASSWORD} from '@/src/constants/FindPassword/FindPassword';

const NameInput: React.FC<NameInputProps> = ({
  name,
  handleNameChange,
  nameError,
  deleteName,
}) => {
  return (
    <Box style={NameInputStyles.inputContainer2}>
      <Text style={NameInputStyles.inputLabel}>
        기존 이름 입력 <Text style={NameInputStyles.starmark}>*</Text>
      </Text>
      <Box style={NameInputStyles.inputWrapper}>
        <TextInput
          style={NameInputStyles.inputBox}
          placeholder={FIND_PASSWORD.PLACE_HOLDER.NAME}
          placeholderTextColor={FIND_PASSWORD.PLACE_HOLDER.COLOR}
          value={name}
          onChangeText={handleNameChange}
        />
        {name.length > 0 && (
          <TouchableOpacity
            style={NameInputStyles.resetButton}
            onPress={deleteName}>
            <Image
              source={ICONS.RESET_BUTTON}
              style={NameInputStyles.clearIcon}
              alt={FIND_PASSWORD.PLACE_HOLDER.NAME}
            />
          </TouchableOpacity>
        )}
      </Box>
      {nameError && (
        <Box style={NameInputStyles.iconAndTextContainer}>
          <Image
            source={ICONS.I_ICON}
            style={NameInputStyles.setiIcon}
            alt={nameError}
          />
          <Text style={NameInputStyles.activeText}>{nameError}</Text>
        </Box>
      )}
    </Box>
  );
};

export default NameInput;
