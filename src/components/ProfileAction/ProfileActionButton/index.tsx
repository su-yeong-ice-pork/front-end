import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {Box} from '@/components/ui/box';
import {Button} from '@/components/ui/button';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {HStack} from '@/components/ui/hstack';
import {setItem} from '@/src/api/asyncStorage';

const IMAGES = {
  changePassword: require('../../../../assets/images/icons/lockIcon.png'),
  logoutIcon: require('../../../../assets/images/icons/logoutIcon.png'),
};

interface ProfileActionButtonProps {
  imageType: string;
  text: string;
}

const {width, height} = Dimensions.get('window');

const ProfileActionButton: React.FC<ProfileActionButtonProps> = ({
  imageType,
  text,
}) => {
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
    <Button onPress={handleClick}>
      <HStack
        style={{
          width: width,
          height: height * 0.05,
          backgroundColor: '#fff',
          justifyContent: 'center',
          paddingVertical: 10,
        }}>
        <Box style={{marginRight: 7, height: 1, marginTop: 1, marginBottom: 1}}>
          <Image
            size="2xs"
            source={IMAGES[imageType]}
            alt="changePasswordIcon"
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
            }}
          />
        </Box>
        <Text size="md" bold="true" style={{color: '#000'}}>
          {text}
        </Text>
      </HStack>
    </Button>
  );
};

export default ProfileActionButton;
