import React from 'react';
import {Text, Box} from '@/components/ui';
import {Button} from '@/components/ui/button';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import LinearGradient from 'react-native-linear-gradient';
import {SaveButtonStyles} from './SaveButtonStyles';
import {SaveButtonProps} from '@/src/constants/EditProfile/SaveButton';
import {CHANGE_PROFILE_SUBMIT} from '@/src/constants/EditProfile/Message';
import useSubmitProfileUpdate from '@/src/hooks/useSaveButton';

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
}) => {
  const authInfo = useRecoilValue(authState);
  const mutation = useSubmitProfileUpdate();

  const handleSubmit = () => {
    mutation.mutate(
      {
        id,
        authToken: authInfo.authToken,
        selectedProfile,
        selectedBanner,
        isCustomImage,
        isCustomBanner,
        currentMessage,
        clearProfile: () => setSelectedImage(null),
        clearBanner: () => setSelectedBanner(null),
      },
      {
        onSuccess: data => {
          setUploadSuccess(true);
        },
        onError: (error: any) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <Box>
      <Button style={SaveButtonStyles.signUpButton} onPress={handleSubmit}>
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
      {mutation.isError && (
        <Text style={{color: 'red'}}>{mutation.error?.message}</Text>
      )}
    </Box>
  );
};

export default SaveButton;
