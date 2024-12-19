import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {FriendsMessageStyles} from './FriendsMessageStyles';

const FriendsMessage = () => {
  return (
    <Box style={FriendsMessageStyles.friendMessageSection}>
      <Text style={FriendsMessageStyles.sectionTitle}>친구의 한마디</Text>
      <Box style={FriendsMessageStyles.friendMessageButton}>
        <Text style={FriendsMessageStyles.friendMessageText}>
          기말고사 힘들다..
        </Text>
      </Box>
    </Box>
  );
};

export default FriendsMessage;
