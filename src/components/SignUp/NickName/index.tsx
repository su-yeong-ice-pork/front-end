import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Button, ButtonText} from '@/components/ui/button';
import {VStack} from '@/components/ui/vstack';
import {NickNameStyles} from './NicknameStyles';
import InputBox from '../VerifyEmail/InputBox';
import {NickName as Nick} from '@/src/constants/SignUp/NickName';
import {useCheckName} from '@/src/hooks/useCheckName';

const NickName = () => {
  const [localName, setLocalName] = useState<string>('');
  const {checkName} = useCheckName();

  return (
    <Box>
      <VStack style={NickNameStyles.inputWrapper}>
        <InputBox
          inputTitle={Nick.TITLE}
          placeholderText={Nick.PLACEHOLDER}
          value={localName}
          setValue={setLocalName}
        />
        <Button
          style={NickNameStyles.codeButton}
          onPress={() => checkName(localName)}>
          <ButtonText style={NickNameStyles.requestCodeButtonText}>
            중복확인
          </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default NickName;
