import React, {useState} from 'react';
import {Image} from 'react-native';
import {Text, Box} from '@/components/ui';
import {Input, InputField} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useRecoilValue} from 'recoil';
import userState from '@/src/recoil/userAtom';
import {ICONS} from '@/src/constants/image/icons';
import {ChangeMessageStyles} from './ChangeMessageStyles';
import {ChangeMessageProps} from '@/src/constants/EditProfile/ChangeMessage';
import {CHANGE_MESSAGE_TITLE} from '@/src/constants/EditProfile/Message';

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
          {CHANGE_MESSAGE_TITLE}
          {currentMessage && <Text>({messageLength}/30)</Text>}
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
