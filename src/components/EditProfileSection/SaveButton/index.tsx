import React from 'react';
import {Text,Box} from '@/components/ui';
import {Button} from '@/components/ui/button';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import LinearGradient from 'react-native-linear-gradient';
import {updateProfileImage} from '@/src/api/profileImg';
import changeMessage from '@/src/api/changeMessage';
import sendDefaultImg from '@/src/api/sendDefaultImg';
import {SaveButtonStyles} from './SaveButtonStyles';
import {SaveButtonProps} from '@/src/constants/EditProfile/SaveButton';
import {
  CHANGE_PROFILE_SUBMIT,
  CHANGE_PROFILE_SUBMIT_MESSAGE,
} from '@/src/constants/EditProfile/Message';

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
            console.log(
              CHANGE_PROFILE_SUBMIT_MESSAGE.profileImageUploadSuccess,
            );
            successProfile = true;
            setSelectedImage(null);
          } else {
            console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.profileImageUploadFail);
          }
        } catch (error) {
          console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.error, error);
        }
      } else {
        try {
          const response = await sendDefaultImg(id, authToken, 'profile', {
            url: selectedProfile,
          });
          if (response.success) {
            console.log(
              CHANGE_PROFILE_SUBMIT_MESSAGE.defaultProfileImageUploadSuccess,
            );
            successProfile = true;
            setSelectedImage(null);
          } else {
            console.log(
              CHANGE_PROFILE_SUBMIT_MESSAGE.defaultProfileImageUploadFail,
            );
          }
        } catch (error) {
          console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.error, error);
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
              console.log(
                CHANGE_PROFILE_SUBMIT_MESSAGE.bannerImageUploadSuccess,
              );
              successBanner = true;
              setSelectedBanner(null);
            } else {
              console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.bannerImageUploadFail);
            }
          } catch (error) {
            console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.error, error);
          }
        } else {
          try {
            const response = await sendDefaultImg(id, authToken, 'banner', {
              url: selectedBanner,
            });
            if (response.success) {
              console.log(
                CHANGE_PROFILE_SUBMIT_MESSAGE.defaultBannerImageUploadSuccess,
              );
              successBanner = true;
              setSelectedBanner(null);
            } else {
              console.log(
                CHANGE_PROFILE_SUBMIT_MESSAGE.defaultBannerImageUploadFail,
              );
            }
          } catch (error) {
            console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.error, error);
          }
        }
      }

      if (currentMessage) {
        try {
          const success = await changeMessage(id, authToken, {
            message: currentMessage,
          });

          if (success) {
            console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.messageChangeSuccess);
            successMessage = true;
          } else {
            console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.messageChangeFail);
          }
        } catch (error) {
          console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.error, error);
        }
      }

      if (successProfile || successBanner || successMessage) {
        setUploadSuccess(true);
      } else {
        console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.imageUploadFail);
      }

      setIsLoading(false);
    }
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
          <Text style={SaveButtonStyles.signUpButtonText}>
            {CHANGE_PROFILE_SUBMIT}
          </Text>
        </LinearGradient>
      </Button>
    </Box>
  );
};

export default SaveButton;
