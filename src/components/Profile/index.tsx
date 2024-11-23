import React from 'react';
import {Box} from '@/components/ui/box';
import ProfileHeader from './ProfileHeader';
import ProfileName from './ProfileName';

const Profile = () => {
  return (
    <Box>
      <ProfileHeader />
      <ProfileName nickName={'초심자'} name={'ADMIN'} />
    </Box>
  );
};

export default Profile;
