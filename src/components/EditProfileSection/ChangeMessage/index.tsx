import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {Text} from '@/components/ui/text';
import {Input, InputField} from '@/components/ui/input';
import {Box} from '@/components/ui/box';
import {Button} from '@/components/ui/button';
import {useRecoilValue} from 'recoil';
import userState from '@/src/recoil/userAtom';
import {ICONS} from '@/src/constants/image/icons';
import {ChangeMessageStyles} from './ChangeMessageStyles';
import {ChangeMessageProps} from '@/src/constants/EditProfile/ChangeMessage';
const ChangeMessage: React.FC<ChangeMessageProps> = ({
  currentMessage,
  setCurrentMessage,
}) => {
  const user = useRecoilValue(userState);

  const [messageLength, setMessageLength] = useState<number>(0);

  const handleMessageChange = (text: string) => {
    setCurrentMessage(text);
    setMessageLength(text.length);
  };

  const deleteMessage = () => {
    setCurrentMessage('');
  };

  return (
    <Box>
      <Box style={ChangeMessageStyles.inputContainer2}>
        <Text style={ChangeMessageStyles.textStyle}>
          상태 메시지 변경 {currentMessage && <Text>({messageLength}/30)</Text>}
        </Text>

        <Input style={ChangeMessageStyles.inputWrapper}>
          <InputField
            style={ChangeMessageStyles.inputBox}
            placeholder={user?.message}
            placeholderTextColor="#838F8F"
            value={currentMessage}
            onChangeText={handleMessageChange}
            maxLength={30}
          />
          {currentMessage.length > 0 && (
            <Button
              style={ChangeMessageStyles.resetButton}
              onPress={deleteMessage}>
              <Image
                source={ICONS.RESET_BUTTON}
                style={ChangeMessageStyles.clearIcon}
              />
            </Button>
          )}
        </Input>
      </Box>
    </Box>
  );
};

export default ChangeMessage;
