import React from 'react';
import {Box} from '@/components/ui/box';
import FriendsProfileHeader from './ProfileHeader';
import FriendsProfileName from './ProfileName';
import {OtherUsersProps} from '@/src/api/otherUsers/getOtherUsersTypes';
const FriendsProfiles: React.FC<OtherUsersProps> = ({
  otherMember,
  edit,
  back,
}) => {
  return (
    <Box>
      {otherMember && (
        <FriendsProfileHeader
          otherMember={otherMember}
          edit={edit}
          back={back}
        />
      )}
      {otherMember && <FriendsProfileName otherMember={otherMember} />}
    </Box>
  );
};

export default FriendsProfiles;
