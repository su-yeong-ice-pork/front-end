import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {CheerUpTextStyles} from './CheerUpTextStyles';
import {Button} from '@/components/ui/button';
import {INFO} from '@/src/constants/Info/Messages';
import {InputField, Input} from '@/components/ui/input';
const supportTextPlaceholder = '예시) 잔디야! 오늘 8시에 새도 스터디 기억하지?';

const CheerupText = () => {
  const [supportText, setSupportText] = useState('');

  const handleSendPress = () => {
    setSupportText('');
  };

  return (
    <Box style={CheerUpTextStyles.supportTextSection}>
      <Text style={CheerUpTextStyles.sectionTitle}>응원텍스트</Text>
      <Input>
        <InputField
          style={CheerUpTextStyles.textInputPlaceholder}
          placeholder={supportTextPlaceholder}
          maxLength={20}
        />

        <Button
          style={[
            CheerUpTextStyles.sendButton,
            supportText.trim() === '' && CheerUpTextStyles.sendButtonDisabled,
          ]}
          onPress={handleSendPress}
          disabled={supportText.trim() === ''}>
          <Text style={CheerUpTextStyles.sendButtonText}>보내기</Text>
        </Button>
      </Input>
      <Text style={CheerUpTextStyles.infoText}>{INFO.TEXT}</Text>
    </Box>
  );
};

export default CheerupText;
