import React, {useState, useEffect} from 'react';
import {
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalBody,
} from '@/components/ui/modal';
import {Box, Text, HStack} from '@/components/ui';
import {Input, InputField} from '@/components/ui/input';
import {Button, ButtonText} from '@/components/ui/button';
import {Image} from '@/components/ui/image';

import {ICONS} from '@/src/constants/image/icons';
import {InviteFriendStyles} from './InviteFriendStyles';
import {INVITE_FRIEND_MODAL} from '@/src/constants/InviteFriend/InviteFriend';
import {InviteFriendProps} from '../types/InviteFriendType/InviteFriend';

const InviteFriend: React.FC<InviteFriendProps> = ({isOpen, onClose}) => {
  if (!isOpen) return null;
  const [code, setCode] = useState<string>('');

  const handleCodePaste = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />

      <ModalContent>
        <ModalHeader style={InviteFriendStyles.ModalHeader}>
          <HStack style={InviteFriendStyles.headerContainer}>
            <Text style={InviteFriendStyles.headerText}>
              {INVITE_FRIEND_MODAL.TITLE}
            </Text>
            <ModalCloseButton
              onPress={onClose}
              style={InviteFriendStyles.closeButtonContainer}>
              <Image
                style={InviteFriendStyles.closeButton}
                source={ICONS.CLOSE_BUTTON}
                alt={INVITE_FRIEND_MODAL.ALT}
              />
            </ModalCloseButton>
          </HStack>
        </ModalHeader>

        <ModalBody style={InviteFriendStyles.modalBody}>
          <Box style={InviteFriendStyles.inputTitle}>
            <Text style={InviteFriendStyles.label}>
              {INVITE_FRIEND_MODAL.SUB_TITLE}
            </Text>
            <Box style={InviteFriendStyles.codeContainer}>
              <Input style={InviteFriendStyles.input}>
                <InputField
                  style={InviteFriendStyles.inputField}
                  value={code}
                  onChangeText={text => setCode(text)}
                />
              </Input>
              <Button
                onPress={handleCodePaste}
                style={InviteFriendStyles.copyButton}>
                <ButtonText style={InviteFriendStyles.copyButtonText}>
                  {INVITE_FRIEND_MODAL.COPY_BUTTON}
                </ButtonText>
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InviteFriend;
