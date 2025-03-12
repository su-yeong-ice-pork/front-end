import React from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Button} from '@/components/ui/button';
import {Image} from 'react-native';
import {ICONS} from '@/src/constants/image/icons';
import {FriendsLeaveButtonStyles} from './FriendsLeaveButtonStyles';
import {OtherUsersProps} from '@/src/api/otherUsers/getOtherUsersTypes';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import useDeleteFriend from '@/src/hooks/useDeleteFriends';

const FriendsLeaveButton: React.FC<OtherUsersProps> = ({otherMember: user}) => {
  const authInfo = useRecoilValue(authState);
  const {deleteFriend, isLoading, error} = useDeleteFriend(authInfo.authToken);

  const handleLeaveFriend = async () => {
    const success = await deleteFriend(user.id);
    if (success) {
      console.log('친구 삭제 성공');
      //삭제 후 네비게이션 추가
    } else {
      console.error('친구 삭제 실패:', error);
    }
  };

  return (
    <Box style={FriendsLeaveButtonStyles.leaveButtonContainer}>
      <Button
        style={FriendsLeaveButtonStyles.leaveButton}
        onPress={handleLeaveFriend}>
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
