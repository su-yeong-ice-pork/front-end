import React from 'react';
import {Box} from '@/components/ui/box';
import ProfileHeader from './ProfileHeader';
import ProfileName from './ProfileName';

const Profiles = () => {
  return (
    <Box>
      <ProfileHeader />
      <ProfileName nickName={'초심자'} name={'ADMIN'} />
    </Box>
  );
};

export default Profiles;
