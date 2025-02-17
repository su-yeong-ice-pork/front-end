import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {Box, Text} from '@/components/ui';
import {launchImageLibrary} from 'react-native-image-picker';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ChangeProfileImage from '../../components/EditProfileSection/ChangeProfile';
import {GetDefaultImages, DefaultImg} from '../../api/defaultImages';
import SaveButton from '../../components/EditProfileSection/SaveButton';
import ChangeBannerImage from '../../components/EditProfileSection/ChangeBanner';
import SuccessModal from '../../components/EditProfileSection/SuccessModal';
import {useRecoilValue} from 'recoil';
import authState from '../../recoil/authAtom';
import ChangeMessage from '../../components/EditProfileSection/ChangeMessage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {EditProfileScreenStyles} from './EditProfileScreenStyles';
import {
  LOAD_PROFILE_MESSAGE,
  TITLE,
  TITLE_MESSAGE,
} from '@/src/constants/EditProfile/Message';
import {FONT} from '@/src/constants/styles/font/default-font.ts';

const fetchDefaultImages = async (
  authToken: string,
  id: string,
  setDefaultProfile: Function,
  setDefaultBanner: Function,
) => {
  try {
    const defaultProfileImgs = await GetDefaultImages(authToken, id, 'profile');
    if (defaultProfileImgs) {
      setDefaultProfile(defaultProfileImgs);
      console.log(LOAD_PROFILE_MESSAGE.loadProfileImageSuccess);
    } else {
      console.log(LOAD_PROFILE_MESSAGE.loadProfileImageFail);
    }

    const defaultBannerImgs = await GetDefaultImages(authToken, id, 'banner');
    if (defaultBannerImgs) {
      setDefaultBanner(defaultBannerImgs);
      console.log(LOAD_PROFILE_MESSAGE.loadBannerImageSuccess);
    } else {
      console.log(LOAD_PROFILE_MESSAGE.loadBannerImageFail);
    }
  } catch (error) {
    console.error(LOAD_PROFILE_MESSAGE.dataFetchError, error);
  }
};

const EditProfileScreen = ({route}) => {
  const {id} = route.params;
  const authInfo = useRecoilValue(authState);
  const [defaultProfile, setDefaultProfile] = useState<DefaultImg[] | null>(
    null,
  );
  const [defaultBanner, setDefaultBanner] = useState<DefaultImg[] | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCustomImage, setIsCustomImage] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isCustomBanner, setIsCustomBanner] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [customProfileImages, setCustomProfileImages] = useState([]);
  const [customBannerImages, setCustomBannerImages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDefaultImages(
      authInfo.authToken,
      id,
      setDefaultProfile,
      setDefaultBanner,
    );
  }, [authInfo.authToken, id]);

  const handleDefaultImageSelect = imageUrl => {
    setSelectedImage(imageUrl);
    setIsCustomImage(false);
  };

  const handleDefaultBannerSelect = bannerUrl => {
    setSelectedBanner(bannerUrl);
    setIsCustomBanner(false);
  };

  const ShowPicker = (setImage, setIsCustom, setCustomImages) => {
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
    <>
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
                style={{color: '#00AAB0', fontWeight: '800', fontFamily: FONT}}>
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
              setIsLoading={setIsLoading}
            />
          </Box>
        </KeyboardAwareScrollView>
        <SuccessModal
          uploadSuccess={uploadSuccess}
          setUploadSuccess={setUploadSuccess}
        />
        {isLoading && <Loader />}
      </SafeAreaView>
    </>
  );
};

export default EditProfileScreen;
