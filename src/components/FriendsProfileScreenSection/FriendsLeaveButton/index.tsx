import {Button, ButtonText, ButtonIcon} from '@/components/ui/button';
import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Image} from 'react-native';
import {Text} from '@/components/ui/text';
import {ICONS} from '@/src/constants/image/icons';
import {FriendsLeaveButtonStyles} from './FriendsLeaveButtonStyles';
const FriendsLeaveButton = () => {
  return (
    <Box style={FriendsLeaveButtonStyles.leaveButtonContainer}>
      <Button style={FriendsLeaveButtonStyles.leaveButton}>
        <Image
          source={ICONS.LEAVE_FRIEND}
          style={FriendsLeaveButtonStyles.leaveIcon}
        />
        <Text style={FriendsLeaveButtonStyles.leaveButtonText}>
          친구 떠나기
        </Text>
      </Button>
    </Box>
  );
};

export default FriendsLeaveButton;
