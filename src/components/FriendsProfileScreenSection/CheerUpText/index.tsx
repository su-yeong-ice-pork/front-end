import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {CheerUpTextStyles} from './CheerUpTextStyles';
import {Button} from '@/components/ui/button';
import {INFO} from '@/src/constants/Info/Messages';
import {InputField, Input} from '@/components/ui/input';
import {PLACEHOLDER} from '@/src/constants/FriendsScreen/cheerupText';
import useSendCheerMessage from '@/src/hooks/friends/useSendMessage';
import {OtherUsersProps} from '@/src/api/otherUsers/getOtherUsersTypes';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';

const CheerupText: React.FC<OtherUsersProps> = ({otherMember: user}) => {
  const [supportText, setSupportText] = useState('');
  const authInfo = useRecoilValue(authState);
  const friendId = user.id;
  const {mutate, isLoading, error} = useSendCheerMessage(
    friendId,
    authInfo.authToken,
  );

  const handleSendPress = () => {
    if (supportText.trim() === '') return;
    mutate(supportText, {
      onSuccess: data => {
        console.log('응원 메시지 전송 성공:', data);
        setSupportText('');
      },
      onError: err => {
        console.error('응원 메시지 전송 실패:', err);
      },
    });
  };

  return (
    <Box style={CheerUpTextStyles.supportTextSection}>
      <Text style={CheerUpTextStyles.sectionTitle}>응원텍스트</Text>
      <Input>
        <InputField
          style={CheerUpTextStyles.textInputPlaceholder}
          placeholder={PLACEHOLDER.text}
          maxLength={20}
          value={supportText}
          onChangeText={text => setSupportText(text)}
        />

        <Button
          style={[
            CheerUpTextStyles.sendButton,
            supportText.trim() === '' && CheerUpTextStyles.sendButtonDisabled,
          ]}
          onPress={handleSendPress}
          disabled={supportText.trim() === '' || isLoading}>
          <Text style={CheerUpTextStyles.sendButtonText}>보내기</Text>
        </Button>
      </Input>
      {error && <Text style={{color: 'red'}}>메시지 전송 실패</Text>}
      <Text style={CheerUpTextStyles.infoText}>{INFO.TEXT}</Text>
    </Box>
  );
};

export default CheerupText;
