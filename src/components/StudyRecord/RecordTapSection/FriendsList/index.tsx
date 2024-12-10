import React from 'react';

import {Box} from '@/components/ui/box';

import {FriendsListStyles} from './FriendsListStyles';
import FriendItem from './FriendItem';
import {MAGIC_NUMBER} from '@/src/constants/Number/MagicNumber';
import {DummyFriendsList} from '@/src/constants/StudyDetail/Dummy/FriendsList';

const FriendsList = () => {
  return (
    <>
      <Box style={FriendsListStyles.membersList}>
        {DummyFriendsList.friends.map((member, index) => (
          <Box key={member.id}>
            <FriendItem
              id={member.id}
              profileImage={member.profileImage}
              name={member.name}
              message={member.message}
              todayStudyTime={member.todayStudyTime}
              studyStatus={member.studyStatus}
            />
            {index !== DummyFriendsList.friends.length - MAGIC_NUMBER.ONE && (
              <Box style={FriendsListStyles.separator} />
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default FriendsList;
