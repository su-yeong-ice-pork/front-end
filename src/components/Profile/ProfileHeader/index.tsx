import React from 'react';
import {ImageBackground} from '@/components/ui/image-background';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {ProfileStyles} from './ProfileHeaderStyles';
import {Box} from '@/components/ui/box';
import {UsersProps} from '@/src/api/user/getUserDataType';

const ProfileHeader: React.FC<UsersProps> = ({member}) => {
  return (
    <>
      {member.map(user => (
        <Box key={user.id} style={ProfileStyles.profileBox}>
          {/* 배너 이미지 */}
          <ImageBackground
            source={{uri: user.mainBanner}}
            style={ProfileStyles.profileImageBackgroud}
            resizeMode="cover"
          />
          {/* 프로필 이미지 */}
          <Box style={ProfileStyles.profileImageContainer}>
            <Box style={ProfileStyles.profileImage}>
              <Avatar size="xl" style={ProfileStyles.profileAvatar}>
                <AvatarImage source={{uri: user.profileImage}} />
              </Avatar>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default ProfileHeader;
