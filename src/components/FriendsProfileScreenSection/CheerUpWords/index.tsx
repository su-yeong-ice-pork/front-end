import React from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Alert} from 'react-native';
import {Button} from '@/components/ui/button';
import {CheerupWordsStyles} from './CheerUpWordsStyles';
import {INFO} from '@/src/constants/Info/Messages';
import useSendCheerMessage from '@/src/hooks/friends/useSendMessage';
import {OtherUsersProps} from '@/src/api/otherUsers/getOtherUsersTypes';
import authState from '@/src/recoil/authAtom';
import {useRecoilValue, useRecoilState} from 'recoil';
import {messageRequestCountAtom} from '@/src/recoil/enlargedStickerAtom';

const CheerupWords: React.FC<OtherUsersProps> = ({otherMember: user}) => {
  const supportMessages = [
    {id: 1, text: '잔디 심자!'},
    {id: 2, text: '힘내!'},
    {id: 3, text: '더 심자!'},
    {id: 4, text: '잔디 챙겨!'},
  ];
  const authInfo = useRecoilValue(authState);
  const [requestCount, setRequestCount] = useRecoilState(
    messageRequestCountAtom,
  );
  const friendId = user.id;
  const {mutate, error} = useSendCheerMessage(friendId, authInfo.authToken);

  const handlePress = (message: string) => {
    if (requestCount >= 2) {
      Alert.alert('경고', '스티커는 하루 두개씩 가능합니다');
      return;
    }
    mutate(message, {
      onSuccess: data => {
        console.log('응원 메시지 전송 성공:', data);
        setRequestCount(prev => prev + 1);
      },
      onError: err => {
        console.error('응원 메시지 전송 실패:', err);
      },
    });
  };

  return (
    <Box style={CheerupWordsStyles.supportMessageSection}>
      <Text style={CheerupWordsStyles.sectionTitle}>응원문구</Text>
      <Box style={CheerupWordsStyles.messageContainer}>
        {supportMessages.map(message => (
          <Button
            key={message.id}
            style={CheerupWordsStyles.supportButton}
            onPress={() => handlePress(message.text)}
            disabled={requestCount >= 2}>
            <Text
              style={CheerupWordsStyles.supportButtonText}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {message.text}
            </Text>
          </Button>
        ))}
      </Box>
      {error && <Text style={{color: 'red'}}>메시지 전송 실패</Text>}
      <Text style={CheerupWordsStyles.infoText}>{INFO.WORDS}</Text>
    </Box>
  );
};

export default CheerupWords;
