import React from 'react';
import {useRecoilValue} from 'recoil';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui';
import {FriendsListStyles} from './FriendsListStyles';
import FriendItem from './FriendItem';
import {MAGIC_NUMBER} from '@/src/constants/Number/MagicNumber';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PATH_NAME} from '@/src/constants/BottomBar/Images';
import useFriends from '@/src/hooks/useFriends';
import userState from '@/src/recoil/userAtom';
import authState from '@/src/recoil/authAtom';

const FriendsList = () => {
  const user = useRecoilValue(userState);
  const authInfo = useRecoilValue(authState);

  const {friends, isLoading, error} = useFriends(authInfo?.authToken, user?.id);
  console.log(friends);
  console.log(error);

  if (isLoading) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (!friends || friends.length === 0) {
    return <Box></Box>;
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
