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
import {DummyAddFriendsList} from '@/src/constants/StudyDetail/Dummy/AddFriendList';
import FriendSearchResult from './FriendSearchResult';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {EMOJIS} from '@/src/constants/image/emojis';

const AddFriend: React.FC<AddFriendProps> = ({isOpen, onClose}) => {
  const [friend, setFriend] = useState<string>('');
  const [friendData, setFriendData] = useState<any | null>(null);

  const handleAddFriend = () => {
    if (DummyAddFriendsList.success) {
      const member = DummyAddFriendsList.response.member;
      setFriendData(member);
    } else {
      setFriendData(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader style={AddFriendStyles.ModalHeader}>
          <HStack style={AddFriendStyles.headerContainer}>
            <Text style={AddFriendStyles.headerText}>
              {ADD_FRIEND.MODAL_HEADER}
            </Text>
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
                onPress={handleAddFriend}
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

          <Box>
            <HStack style={AddFriendStyles.header}>
              <Image
                source={ICONS.USERS}
                style={AddFriendStyles.clickIcon}
                alt={ADD_FRIEND.GROUP_ICON_ALT}
              />
              <Text style={AddFriendStyles.titleText}>
                {ADD_FRIEND.HEADER_TITLE_ADD}
              </Text>
            </HStack>
          </Box>

          <Box style={AddFriendStyles.friendListContainer}>
            {friendData ? (
              <FriendSearchResult friendData={friendData} />
            ) : (
              <Box style={AddFriendStyles.friendList}>
                <HStack>
                  <Text style={AddFriendStyles.friendListText}>
                    {ADD_FRIEND.ERROR_MESSAGE}
                  </Text>
                  <Image
                    source={EMOJIS.SWEAT}
                    style={AddFriendStyles.emojiIcon}
                    alt={ADD_FRIEND.SWEAT_ICON_ALT}
                  />
                </HStack>
              </Box>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddFriend;
