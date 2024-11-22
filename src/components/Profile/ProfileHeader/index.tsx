import React from 'react';
import {ImageBackground} from '@/components/ui/image-background';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {ProfileStyles} from '../ProfileHeaderStyles';
import {Box} from '@/components/ui/box';

const ProfileHeader = () => {
  return (
    <Box style={{position: 'relative', height: 150}}>
      {/* 배너 이미지 */}
      <ImageBackground
        source={ILLUSTRATIONS.BANNER_IMAGE1}
        style={{width: '100%', height: 100}}
        resizeMode="cover"
      />
      {/* 프로필 이미지 */}
      <Box
        style={{
          marginTop: -70, // 프로필과 배너 겹치기
        }}>
        <Box style={ProfileStyles.profileImage}>
          <Avatar size="xl" style={{width: 100, height: 100}}>
            <AvatarImage source={ILLUSTRATIONS.PROFILE_IMAGE1} />
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
