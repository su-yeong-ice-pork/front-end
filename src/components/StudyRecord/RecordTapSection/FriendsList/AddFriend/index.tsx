import React, {useState} from 'react';
import {Box, HStack, Image, Text} from '@/components/ui';
import {
  Modal,
  ModalBackdrop,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@/components/ui/modal';
import {ICONS} from '@/src/constants/image/icons';
import {Button, ButtonIcon} from '@/components/ui/button';
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input';

import {AddFriendStyles} from './AddFriendStyles';
import {AddFriendProps} from '@/src/components/types/StudyDetailType/FriendsType/FriendsListType';
import {ADD_FRIEND} from '@/src/constants/StudyDetail/studyDetail';

const AddFriend: React.FC<AddFriendProps> = ({isOpen, onClose}) => {
  const [friend, setFriend] = useState<string>('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader style={AddFriendStyles.modalHeader}>
          <HStack>
            <Image
              source={ICONS.CLICK_ICON}
              alt={ADD_FRIEND.CLICK_ICON_ALT}
              style={AddFriendStyles.clickIcon}
            />
            <Text style={AddFriendStyles.titleText}>친구 찾기</Text>
          </HStack>
          <ModalCloseButton
            onPress={onClose}
            style={AddFriendStyles.closeButtonContainer}>
            <Image
              style={AddFriendStyles.closeButton}
              source={ICONS.CLOSE_BUTTON}
              alt={ADD_FRIEND.CLOSE_IOCN_ALT}
            />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody style={AddFriendStyles.modalBody}>
          <Input style={AddFriendStyles.inputContainer}>
            <InputField
              placeholder={ADD_FRIEND.INPUT_PLACEHOLER}
              value={friend}
              onChangeText={text => setFriend(text)}
              type={ADD_FRIEND.INPUT_TYPE}
              style={AddFriendStyles.inputField}
            />
            <InputSlot>
              <Button
                onPress={() => console.log(friend)}
                style={AddFriendStyles.buttonContainer}>
                <ButtonIcon>
                  <Image
                    source={ICONS.SEARCH_ICON}
                    style={AddFriendStyles.searchIcon}
                    alt={ADD_FRIEND.SEARCH_ICON_ALT}
                  />
                </ButtonIcon>
              </Button>
            </InputSlot>
          </Input>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddFriend;
