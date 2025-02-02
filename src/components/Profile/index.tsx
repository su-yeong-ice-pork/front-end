import React from 'react';
import {Box} from '@/components/ui/box';
import ProfileHeader from './ProfileHeader';
import ProfileName from './ProfileName';
import {UsersProps} from '@/src/api/user/getUserDataType';
const Profiles: React.FC<UsersProps> = ({member}) => {
  return (
    <Box>
      <ProfileHeader member={member} />
      <ProfileName member={member} />
    </Box>
  );
};

export default Profiles;
