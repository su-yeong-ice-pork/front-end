import React from 'react';
import {ImageBackground} from '@/components/ui/image-background';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import {Image} from '@/components/ui/image';
import {Box} from '@/components/ui/box';

const IMAGES = {
  sampleBanner: require('../../../../assets/images/illustration/bannerImage1.png'),
  sampleProfileImage: require('../../../../assets/images/illustration/profileImage1.png'),
  editProfile: require('../../../../assets/images/icons/profileEdit.png'),
  backButton: require('../../../../assets/images/icons/profileBackButton.png'),
};

const ProfileHeader = () => {
  return (
    <Box style={{position: 'relative', height: 150}}>
      {/* 배너 이미지 */}
      <ImageBackground
        source={IMAGES.sampleBanner}
        style={{width: '100%', height: 100}}
        resizeMode="cover" // 이미지 크기 조절 방법
      />

      {/* 프로필 이미지 컨테이너 */}
      <Box
        style={{
          marginTop: -70, // 배너와 프로필 이미지 겹치기
        }}>
        {/* Avatar과 Edit Icon을 포함하는 Box */}
        <Box
          style={{
            position: 'relative',
            width: 80,
            height: 80,
            marginLeft: 40,
          }}>
          <Avatar size="xl" style={{width: 100, height: 100}}>
            <AvatarImage source={IMAGES.sampleProfileImage} />
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
