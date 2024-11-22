import React from 'react';
import {Text} from '@/components/ui/text';
import {HStack} from '@/components/ui/hstack';
import {Heading} from '@/components/ui/heading';

const ProfileName = ({nickName, name}) => {
  return (
    <HStack className="ml-10">
      <Text
        size="xs"
        bold="true"
        style={{color: '#00A6AC', marginRight: 10, marginTop: 7}}>
        {nickName}
      </Text>
      <Heading>{name}</Heading>
    </HStack>
  );
};

export default ProfileName;
