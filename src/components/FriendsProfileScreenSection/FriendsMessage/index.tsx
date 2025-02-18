import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {FriendsMessageStyles} from './FriendsMessageStyles';
import {OtherUsersProps} from '@/src/api/otherUsers/getOtherUsersTypes';

const FriendsMessage: React.FC<OtherUsersProps> = ({otherMember: user}) => {
  console.log(user);
  return (
    <Box style={FriendsMessageStyles.friendMessageSection}>
      <Text style={FriendsMessageStyles.sectionTitle}>친구의 한마디</Text>
      <Box style={FriendsMessageStyles.friendMessageButton}>
        <Text style={FriendsMessageStyles.friendMessageText}>
          {user && user.message}
        </Text>
      </Box>
    </Box>
  );
};

export default FriendsMessage;
