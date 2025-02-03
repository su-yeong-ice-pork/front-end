import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Input, InputField} from '@/components/ui/input';

import {InputBoxStyles} from './InputBoxStyles';

import {InputBoxProps} from '@/src/components/types/SignUpType/VerifyEmail';

const InputBox = ({
  inputTitle,
  placeholderText,
  value,
  setValue,
}: InputBoxProps) => {
  return (
    <Box>
      <Text style={InputBoxStyles.inputLabel}>
        {inputTitle}
        <Text style={InputBoxStyles.starmark}> *</Text>
      </Text>

      <Input style={InputBoxStyles.inputBox}>
        <InputField
          placeholder={placeholderText}
          style={InputBoxStyles.placeholderText}
          value={value}
          onChangeText={setValue}
        />
      </Input>
    </Box>
  );
};

export default InputBox;
