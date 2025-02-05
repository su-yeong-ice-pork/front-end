import React from 'react';
import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';
import {Button} from '@/components/ui/button';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import LinearGradient from 'react-native-linear-gradient';
import {updateProfileImage} from '@/src/api/profileImg';
import changeMessage from '@/src/api/changeMessage';
import sendDefaultImg from '@/src/api/sendDefaultImg';
import {SaveButtonStyles} from './SaveButtonStyles';
import {SaveButtonProps} from '@/src/constants/EditProfile/SaveButton';
const SaveButton: React.FC<SaveButtonProps> = ({
  selectedProfile,
  selectedBanner,
  isCustomImage,
  isCustomBanner,
  setSelectedImage,
  setSelectedBanner,
  setUploadSuccess,
  id,
  currentMessage,
  setIsLoading,
}) => {
  const authInfo = useRecoilValue(authState);

  const submitDefaultImage = async () => {
    const authToken = authInfo.authToken;
    let successProfile = false;
    let successBanner = false;
    let successMessage = false;
    setIsLoading(true);
    if (selectedProfile) {
      if (isCustomImage) {
        try {
          const success = await updateProfileImage(id, authToken, 'image', {
            uri: selectedProfile,
            name: 'profile.jpg',
            type: 'image/jpeg',
          });

          if (success) {
            console.log('사용자 업로드 프로필 이미지 업로드 성공');
            successProfile = true;
            setSelectedImage(null);
          } else {
            console.log('프로필 이미지 업로드 실패');
          }
        } catch (error) {
          console.log('에러 발생: ', error);
        }
      } else {
        try {
          const response = await sendDefaultImg(id, authToken, 'profile', {
            url: selectedProfile,
          });
          if (response.success) {
            console.log('프로필 기본 이미지 업로드 성공');
            successProfile = true;
            setSelectedImage(null);
          } else {
            console.log('프로필 기본 이미지 업로드 실패');
          }
        } catch (error) {
          console.log('error: ', error);
        }
      }
    }
    if (selectedBanner) {
      if (isCustomBanner) {
        try {
          const success = await updateProfileImage(id, authToken, 'banner', {
            uri: selectedBanner,
            name: 'banner.jpg',
            type: 'image/jpeg',
          });

          if (success) {
            console.log('사용자 업로드 배너 이미지 업로드 성공');
            successBanner = true;
            setSelectedBanner(null);
          } else {
            console.log('배너 이미지 업로드 실패');
          }
        } catch (error) {
          console.log('에러 발생: ', error);
        }
      } else {
        try {
          const response = await sendDefaultImg(id, authToken, 'banner', {
            url: selectedBanner,
          });
          if (response.success) {
            console.log('배너 기본 이미지 업로드 성공');
            successBanner = true;
            setSelectedBanner(null);
          } else {
            console.log('배너 기본 이미지 업로드 실패');
          }
        } catch (error) {
          console.log('error: ', error);
        }
      }
    }
    if (currentMessage) {
      try {
        const success = await changeMessage(id, authToken, {
          message: currentMessage,
        });

        if (success) {
          console.log('상태 메시지 변경 완료');
          successMessage = true;
        } else {
          console.log('상태 메시지 변경 실패');
        }
      } catch (error) {
        console.log('에러 발생: ', error);
      }
    }
    if (successProfile || successBanner || successMessage) {
      setUploadSuccess(true);
    } else {
      console.log('이미지 업로드 실패');
    }

    setIsLoading(false);
  };

  return (
    <Box>
      <Button
        style={SaveButtonStyles.signUpButton}
        onPress={submitDefaultImage}>
        <LinearGradient
          colors={['rgba(31, 209, 245, 1)', 'rgba(0, 255, 150, 1)']}
          style={SaveButtonStyles.signUpButtonGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Text style={SaveButtonStyles.signUpButtonText}>저장하기</Text>
        </LinearGradient>
      </Button>
    </Box>
  );
};

export default SaveButton;
