import React from 'react';
import {useRecoilValue} from 'recoil';
import {View} from 'react-native';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui';
import {FriendsListStyles} from './FriendsListStyles';
import FriendItem from './FriendItem';
import {MAGIC_NUMBER} from '@/src/constants/Number/MagicNumber';

import useFriends from '@/src/hooks/useFriends';
import userState from '@/src/recoil/userAtom';
import authState from '@/src/recoil/authAtom';

const FriendsList = () => {
  const user = useRecoilValue(userState);
  const authInfo = useRecoilValue(authState);

  const {friends, isLoading, error} = useFriends(authInfo?.authToken, user?.id);
  console.log(friends);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!friends || friends.length === 0) {
    return (
      <View>
        <Text>No friends found</Text>
      </View>
    );
  }

  return (
    <Box style={FriendsListStyles.membersList}>
      {friends.map((member, index) => (
        <Box key={member.id}>
          <FriendItem
            id={member.id}
            profileImage={member.profileImage}
            name={member.name}
            message={member.message}
            todayStudyTime={member.todayStudyTime}
            studyStatus={member.studyStatus}
          />
          {index !== friends.length - MAGIC_NUMBER.ONE && (
            <Box style={FriendsListStyles.separator} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default FriendsList;
