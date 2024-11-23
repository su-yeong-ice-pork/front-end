import React from 'react';
import {View} from 'react-native';
import {Box} from '@/components/ui/box';
import ProfileActionButton from './ProfileActionButton';

const ProfileAction = () => {
  return (
    <Box style={{paddingTop: 30, paddingBottom: 30}}>
      <ProfileActionButton
        imageType="changePassword"
        text="비밀번호 변경하기"
      />
      <View
        style={{
          height: 2,
          backgroundColor: '#D1D5DB',
          width: '100%',
        }}
      />
      <ProfileActionButton imageType="logoutIcon" text="로그아웃" />
    </Box>
  );
};

export default ProfileAction;
