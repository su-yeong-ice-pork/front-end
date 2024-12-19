import React from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Button} from '@/components/ui/button';
import {CheerupWordsStyles} from './CheerUpWordsStyles';
import {INFO} from '@/src/constants/Info/Messages';
const CheerupWords = () => {
  const supportMessages = [
    {id: 1, text: '잔디 심자!'},
    {id: 2, text: '힘내!'},
    {id: 3, text: '더 심자!'},
    {id: 4, text: '잔디 챙겨!'},
  ];

  return (
    <Box style={CheerupWordsStyles.supportMessageSection}>
      <Text style={CheerupWordsStyles.sectionTitle}>응원문구</Text>
      <Box style={CheerupWordsStyles.messageContainer}>
        {supportMessages.map(message => (
          <Button key={message.id} style={CheerupWordsStyles.supportButton}>
            <Text
              style={CheerupWordsStyles.supportButtonText}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {message.text}
            </Text>
          </Button>
        ))}
      </Box>
      <Text style={CheerupWordsStyles.infoText}>{INFO.WORDS}</Text>
    </Box>
  );
};

export default CheerupWords;
