import React from 'react';
import {ImageBackground} from '@/components/ui/image-background';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {ProfileStyles} from './ProfileHeaderStyles';
import {Box} from '@/components/ui/box';

const ProfileHeader = () => {
  return (
    <Box style={ProfileStyles.profileBox}>
      {/* 배너 이미지 */}
      <ImageBackground
        source={ILLUSTRATIONS.BANNER_IMAGE1}
        style={ProfileStyles.profileImageBackgroud}
        resizeMode="cover"
      />
      {/* 프로필 이미지 */}
      <Box style={ProfileStyles.profileImageContainer}>
        <Box style={ProfileStyles.profileImage}>
          <Avatar size="xl" style={ProfileStyles.profileAvatar}>
            <AvatarImage source={ILLUSTRATIONS.PROFILE_IMAGE1} />
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
