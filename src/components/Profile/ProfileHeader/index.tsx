import React from 'react';
import { ImageBackground } from '@/components/ui/image-background';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ProfileStyles } from './ProfileHeaderStyles';
import { Box } from '@/components/ui/box';
import { UsersProps } from '@/src/api/user/getUserDataType';
import { ProfileScreenStyles } from '@/src/screens/ProfileScreen/ProfileScreenStyle.ts';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HStack } from '@/components/ui';

const IMAGES = {
  profileBackButton: require('@/assets/images/icons/profileBackButton.png'),
  editProfile: require('@/assets/images/icons/profileEdit.png'),
};

const ProfileHeader: React.FC<UsersProps> = ({ member: user, edit, back }) => {
  const navigation = useNavigation(); // 네비게이션 객체

  return (
    <>
      <Box key={user.id} style={ProfileStyles.profileBox}>
        {/* 뒤로가기 버튼: back이 true일 때만 나타남 */}
        {back && (
          <TouchableOpacity
            style={ProfileStyles.backButtonWrapper}
            onPress={() => navigation.goBack()}>
            <Image
              source={IMAGES.profileBackButton}
              style={ProfileScreenStyles.profileBackButton}
            />
          </TouchableOpacity>
        )}
        {/* 배너 이미지 */}
        <ImageBackground
          source={{ uri: user.mainBanner }}
          style={ProfileStyles.profileImageBackgroud}
          resizeMode="cover"
        />
        <Box style={ProfileStyles.profileImageContainer}>
          {/* 프로필 이미지 */}
          <Box style={ProfileStyles.profileImage}>
            <Avatar size="xl" style={ProfileStyles.profileAvatar}>
              <AvatarImage source={{ uri: user.profileImage }} />
            </Avatar>
            {/* 프로필 수정 버튼: edit가 true일 때만 나타남 */}
            {edit && (
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile', { id: user?.id })}>
                <Image
                  source={IMAGES.editProfile}
                  style={ProfileStyles.editIcon}
                />
              </TouchableOpacity>
            )}
          </Box>
        </Box>
      </Box>
      <HStack></HStack>
    </>
  );
};

export default ProfileHeader;
