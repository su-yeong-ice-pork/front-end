import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
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
      console.log('프로필 이미지를 불러오는데 성공했습니다');
    } else {
      console.log('프로필 이미지를 불러오는 데 실패했습니다.');
    }

    const defaultBannerImgs = await GetDefaultImages(authToken, id, 'banner');
    if (defaultBannerImgs) {
      setDefaultBanner(defaultBannerImgs);
      console.log('배너 이미지를 불러오는 데 성공했습니다.');
    } else {
      console.log('배너 이미지를 불러오는 데 실패했습니다.');
    }
  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
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
        <Header Title={'프로필/배너 꾸미기'} />
        <KeyboardAwareScrollView
          contentContainerStyle={EditProfileScreenStyles.container}
          enableOnAndroid={true}
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled">
          <View style={EditProfileScreenStyles.titleContainer}>
            <Text style={EditProfileScreenStyles.titleText}>
              나의{' '}
              <Text style={{color: '#00AAB0', fontWeight: '800'}}>
                잔디 프로필
              </Text>
              을{'\n'}원하는 대로 예쁘게 꾸며봐요!
            </Text>
          </View>

          <View style={EditProfileScreenStyles.formContainer}>
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
          </View>

          <View style={EditProfileScreenStyles.buttonContainer}>
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
          </View>
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
