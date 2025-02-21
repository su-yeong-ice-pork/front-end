import React from 'react';
import {Text} from '@/components/ui/text';
import {HStack} from '@/components/ui/hstack';
import {Heading} from '@/components/ui/heading';
import {ProfileNameStyles} from './ProfileNameStyles';
import {OtherUsersProps} from '@/src/api/otherUsers/getOtherUsersTypes';

const FriendsProfileName: React.FC<OtherUsersProps> = ({otherMember: user}) => {
  return (
    <>
      <HStack key={user.id} style={ProfileNameStyles.profileNameHstack}>
        <Text size="xs" bold={true} style={ProfileNameStyles.nickNameStyle}>
          {user.mainTitle}
        </Text>
        <Heading>{user.name}</Heading>
      </HStack>
    </>
  );
};

export default FriendsProfileName;
