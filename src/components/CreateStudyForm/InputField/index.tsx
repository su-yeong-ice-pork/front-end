import React, {useState} from 'react';
import {Box, HStack} from '@/components/ui';
import {InputFieldStyles} from './InputFieldStyles.ts';
import {TextInput, Text, TouchableOpacity, Image} from 'react-native';
import {InputFieldProps} from '@/src/components/types/CreateScreenType/InputFieldType.ts';
import {ICONS} from '@/src/constants/image/icons.ts';

const CreateStudyInputField: React.FC<InputFieldProps> = ({
  title,
  placeholder,
  description,
  icon,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleClearInput = () => {
    setInputValue('');
  };

  return (
    <Box style={InputFieldStyles.container}>
      <Text style={InputFieldStyles.title}>
        {title}
        <Text style={InputFieldStyles.star}> *</Text>
      </Text>

      <HStack style={InputFieldStyles.input}>
        <Box>
          {icon && (
            <Image source={ICONS.CLOCK_RED} style={InputFieldStyles.icon} />
          )}
        </Box>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          style={InputFieldStyles.inputPlaceholder}
          placeholderTextColor={'#B9B9B9'}
        />
        <TouchableOpacity onPress={handleClearInput}>
          <Image source={ICONS.CLOSE_BUTTON} style={{width: 20, height: 20}} />
        </TouchableOpacity>
      </HStack>
      <Box>
        {description && (
          <HStack>
            <Image source={ICONS.I_ICON} style={InputFieldStyles.i_Icon} />
            <Text style={InputFieldStyles.description}>{description}</Text>
          </HStack>
        )}
      </Box>
    </Box>
  );
};
export default CreateStudyInputField;
