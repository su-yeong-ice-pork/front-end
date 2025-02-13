import React from 'react';
import {Box} from '@/components/ui/box';
import ProfileHeader from './ProfileHeader';
import ProfileName from './ProfileName';
import {UsersProps} from '@/src/api/user/getUserDataType';
const Profiles: React.FC<UsersProps> = ({member, edit, back}) => {
  return (
    <Box>
      {member && <ProfileHeader member={member} edit={edit} back={back} />}
      {member && <ProfileName member={member} />}
    </Box>
  );
};

export default Profiles;
