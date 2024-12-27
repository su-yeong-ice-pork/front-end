import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Box,Image,Text,HStack} from '@/components/ui/index.ts'
import {TouchableOpacity} from 'react-native'
import {setItem} from '@/src/api/asyncStorage';
import {ProfileActionButtonProps} from "@/src/components/types/ProfileType/ProfileType.ts";
import {ProfileActionButtonStyles} from "@/src/components/ProfileAction/ProfileActionButton/ProfileActionButtonStyle.ts";
import {BUTTON_ALT} from "@/src/constants/Profile/ProfileAction.ts";

const IMAGES = {
  changePassword: require('@/assets/images/icons/lockIcon.png'),
  logoutIcon: require('@/assets/images/icons/logoutIcon.png'),
};


const ProfileActionButton: React.FC<ProfileActionButtonProps> = ({imageType, text,}) => {
  const navigation = useNavigation();

  const handleClick = () => {
    if (text == '비밀번호 변경하기')
      navigation.navigate('FindPassword', {title: '비밀번호 변경하기'});
    else if (text == '로그아웃') {
      navigation.navigate('Landing');
      setItem('autoLogin', '');
      setItem('refreshToken', '');
    }
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <HStack
        style={ProfileActionButtonStyles.buttonBox}>
        <Box style={ProfileActionButtonStyles.iconContainer}>
          <Image
            source={IMAGES[imageType]}
            alt={BUTTON_ALT}
            style={ProfileActionButtonStyles.icon}
          />
        </Box>
        <Text style={ProfileActionButtonStyles.text}>
          {text}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default ProfileActionButton;
