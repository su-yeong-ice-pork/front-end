import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Input, InputField, InputSlot, InputIcon} from '@/components/ui/input';

import {InputBoxStyles} from './InputBoxStyles';

const InputBox = ({inputTitle, placeholderText, value, setValue}) => {
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
