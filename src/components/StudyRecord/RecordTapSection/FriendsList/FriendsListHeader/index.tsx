import React, {useState} from 'react';

import {TouchableOpacity} from 'react-native';
import {FriendsListHeaderStyles} from './FriendsListHeaderStyles';

import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';

import {ICONS} from '@/src/constants/image/icons';
import {STUDY_DETAIL} from '@/src/constants/StudyDetail/studyDetail';
import {Button, ButtonText} from '@/components/ui/button';
import AddFriend from '../AddFriend';

const FriendsListHeader = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Box style={FriendsListHeaderStyles.membersHeader}>
      <Text style={FriendsListHeaderStyles.membersTitle}>친구 목록</Text>
      <Button
        style={FriendsListHeaderStyles.addMemberButton}
        onPress={() => {
          setShowModal(true);
        }}>
        <Image
          source={ICONS.WHITE_USERS}
          style={FriendsListHeaderStyles.redStar}
          alt={STUDY_DETAIL.HEADER}
        />
        <ButtonText style={FriendsListHeaderStyles.addMemberButtonText}>
          친구 추가
        </ButtonText>
      </Button>
      {showModal && (
        <AddFriend isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </Box>
  );
};

export default FriendsListHeader;
