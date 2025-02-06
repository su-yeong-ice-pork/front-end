import React from 'react';
import {Text} from '@/components/ui/text';
import {HStack} from '@/components/ui/hstack';
import {Heading} from '@/components/ui/heading';
import {ProfileNameStyles} from './ProfileNameStyles';
import {UsersProps} from '@/src/api/user/getUserDataType';

const ProfileName: React.FC<UsersProps> = ({member: user}) => {
  return (
    <>
      <HStack key={user.id} style={ProfileNameStyles.profileNameHstack}>
        <Text size="xs" bold={true} style={ProfileNameStyles.nickNameStyle}>
          {user.mainTitle}
        </Text>
        <Heading>{user.mainTitle}</Heading>
      </HStack>
    </>
  );
};

export default ProfileName;
