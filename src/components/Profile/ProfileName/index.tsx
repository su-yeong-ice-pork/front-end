import React from 'react';
import {Text} from '@/components/ui/text';
import {HStack} from '@/components/ui/hstack';
import {Heading} from '@/components/ui/heading';

import {ProfileNameStyles} from './ProfileNameStyles';
import {ProfileNameProps} from '../../types/ProfileType/ProfileType.ts';

const ProfileName = ({nickName, name}: ProfileNameProps) => {
  return (
    <HStack style={ProfileNameStyles.profileNameHstack}>
      <Text size="xs" bold={true} style={ProfileNameStyles.nickNameStyle}>
        {nickName}
      </Text>
      <Heading>{name}</Heading>
    </HStack>
  );
};

export default ProfileName;
