import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Box, Text} from '@/components/ui';
import {launchImageLibrary} from 'react-native-image-picker';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ChangeProfileImage from '../../components/EditProfileSection/ChangeProfile';
import SaveButton from '../../components/EditProfileSection/SaveButton';
import ChangeBannerImage from '../../components/EditProfileSection/ChangeBanner';
import SuccessModal from '../../components/EditProfileSection/SuccessModal';
import {useRecoilValue} from 'recoil';
import authState from '../../recoil/authAtom';
import ChangeMessage from '../../components/EditProfileSection/ChangeMessage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {EditProfileScreenStyles} from './EditProfileScreenStyles';
import {TITLE, TITLE_MESSAGE} from '@/src/constants/EditProfile/Message';
import {FONT} from '@/src/constants/styles/font/default-font';
import useDefaultImages from '@/src/hooks/useEditProfile';
const EditProfileScreen = ({route}) => {
  const {id} = route.params;
  const authInfo = useRecoilValue(authState);

  const {defaultProfile, defaultBanner, isLoading} = useDefaultImages(
    authInfo.authToken,
    id,
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCustomImage, setIsCustomImage] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null);
  const [isCustomBanner, setIsCustomBanner] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [customProfileImages, setCustomProfileImages] = useState<string[]>([]);
  const [customBannerImages, setCustomBannerImages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  const handleDefaultImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsCustomImage(false);
  };

  const handleDefaultBannerSelect = (bannerUrl: string) => {
    setSelectedBanner(bannerUrl);
    setIsCustomBanner(false);
  };

  const ShowPicker = (
    setImage: (uri: string) => void,
    setIsCustom: (state: boolean) => void,
    setCustomImages: (prev: string[]) => void,
  ) => {
    launchImageLibrary({}, res => {
      if (res.didCancel || res.errorCode) {
        return;
      }
      const imageUri = res.assets[0].uri;
      setImage(imageUri);
      setIsCustom(true);
      setCustomImages(prevImages => [...prevImages, imageUri]);
    });
  };

  return (
    <SafeAreaView style={EditProfileScreenStyles.safeArea}>
      <Header Title={TITLE} />
      <KeyboardAwareScrollView
        contentContainerStyle={EditProfileScreenStyles.container}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled">
        <Box style={EditProfileScreenStyles.titleContainer}>
          <Text style={EditProfileScreenStyles.titleText}>
            {TITLE_MESSAGE.MESSAGE_1}
            <Text
              style={{
                color: '#00AAB0',
                fontWeight: '800',
                fontFamily: FONT,
              }}>
              {TITLE_MESSAGE.MESSAGE_2}
            </Text>
            {TITLE_MESSAGE.MESSAGE_3}
          </Text>
        </Box>

        <Box style={EditProfileScreenStyles.formContainer}>
          <ChangeProfileImage
            defaultImages={defaultProfile}
            customImages={customProfileImages}
            selectedImage={selectedImage}
            handleDefaultImageSelect={handleDefaultImageSelect}
            ShowPicker={() =>
              ShowPicker(
                setSelectedImage,
                setIsCustomImage,
                setCustomProfileImages,
              )
            }
          />
          <ChangeBannerImage
            defaultBanners={defaultBanner}
            customImages={customBannerImages}
            selectedBanner={selectedBanner}
            handleDefaultBannerSelect={handleDefaultBannerSelect}
            ShowPicker={() =>
              ShowPicker(
                setSelectedBanner,
                setIsCustomBanner,
                setCustomBannerImages,
              )
            }
          />
          <ChangeMessage
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
          />
        </Box>

        <Box style={EditProfileScreenStyles.buttonContainer}>
          <SaveButton
            selectedProfile={selectedImage}
            selectedBanner={selectedBanner}
            isCustomImage={isCustomImage}
            isCustomBanner={isCustomBanner}
            setSelectedImage={setSelectedImage}
            setSelectedBanner={setSelectedBanner}
            setUploadSuccess={setUploadSuccess}
            id={id}
            currentMessage={currentMessage}
          />
        </Box>
      </KeyboardAwareScrollView>
      <SuccessModal
        uploadSuccess={uploadSuccess}
        setUploadSuccess={setUploadSuccess}
      />
      {isLoading && <Loader />}
    </SafeAreaView>
  );
};

export default EditProfileScreen;
