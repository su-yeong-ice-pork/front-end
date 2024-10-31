import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';

import {GetDefaultImages, DefaultImg} from '../api/defaultImages';
import sendDefaultImg from '../api/sendDefaultImg';

import {updateProfileImage} from '../api/profileImg';
import changeMessage from '../api/changeMessage';

import {useRecoilState, useRecoilValue} from 'recoil';
import userState from '../recoil/userAtom';
import authState from '../recoil/authAtom';

const {width, height} = Dimensions.get('window');

const IMAGES = {
  backButton: require('../../assets/images/icons/backButton.png'),
  plusCircle: require('../../assets/images/icons/plusCircle.png'),
  plusSquare: require('../../assets/images/icons/plusSquare.png'),
  resetButton: require('../../assets/images/icons/resetButton.png'),
};

const EditProfileScreen = ({navigation, route}) => {
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

  // 업로드된 프로필/배너 이미지 저장할 상태
  const [customProfileImages, setCustomProfileImages] = useState([]);
  const [customBannerImages, setCustomBannerImages] = useState([]);

  // 상태 메시지 확인
  const [currentMessage, setCurrentMessage] = useState<string>('');

  useEffect(() => {
    const fetchDefaultImages = async () => {
      try {
        const defaultProfileImgs = await GetDefaultImages(
          authInfo.authToken,
          id,
          'profile',
        );

        if (defaultProfileImgs) {
          setDefaultProfile(defaultProfileImgs);
          console.log('프로필 이미지를 불러오는데 성공했습니다');

          const defaultBannerImgs = await GetDefaultImages(
            authInfo.authToken,
            id,
            'banner',
          );
          if (defaultBannerImgs) {
            setDefaultBanner(defaultBannerImgs);
            console.log('배너 이미지를 불러오는 데 성공했습니다.');
          } else {
            console.log('배너 이미지를 불러오는 데 실패했습니다.');
          }
        } else {
          console.log('프로필 이미지를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.log('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };
    fetchDefaultImages();
  }, []);

  const handleDefaultImageSelect = imageUrl => {
    setSelectedImage(imageUrl);
    setIsCustomImage(false); // 기본 이미지임을 표시
  };

  const handleDefaultBannerSelect = bannerUrl => {
    setSelectedBanner(bannerUrl);
    setIsCustomBanner(false); // 기본 배너 이미지임을 표시
  };

  const ShowPicker = (setImage, setIsCustom, setCustomImages) => {
    launchImageLibrary({}, res => {
      if (res.didCancel || res.errorCode) {
        return;
      }
      const imageUri = res.assets[0].uri;
      setImage(imageUri); // 선택한 이미지 설정
      setIsCustom(true);
      setCustomImages(prevImages => [...prevImages, imageUri]); // 사용자 업로드 이미지임을 표시
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* 헤더 */}
        <Header Title={'프로필/배너 꾸미기'} />

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            나의{' '}
            <Text style={{color: '#00AAB0', fontWeight: '800'}}>
              잔디 프로필
            </Text>
            을{'\n'}원하는 대로 예쁘게 꾸며봐요!
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.formContainer}
          style={{backgroundColor: '#E1E6E8'}}>
          <View style={styles.titleContainer}></View>

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
        </ScrollView>
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
      </View>
      <SuccessModal
        uploadSuccess={uploadSuccess}
        setUploadSuccess={setUploadSuccess}
      />
    </SafeAreaView>
  );
};

export default EditProfileScreen;

// 프로필 사진 변경
const ChangeProfileImage = ({
  defaultImages,
  customImages,
  selectedImage,
  handleDefaultImageSelect,
  ShowPicker,
}) => {
  return (
    <View style={styles.changeContainer}>
      <Text style={styles.textStyle}>프로필 사진 변경</Text>
      <View style={styles.imageBox}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={ShowPicker} style={styles.buttonStyle}>
            <Image
              source={IMAGES.plusCircle}
              style={styles.chooseImageStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {customImages &&
            customImages.map((imageUri, idx) => {
              const isSelected = selectedImage === imageUri;
              return (
                <TouchableOpacity
                  key={`custom-${idx}`}
                  onPress={() => handleDefaultImageSelect(imageUri)}
                  style={styles.buttonStyle}>
                  <View
                    style={[
                      styles.imageContainer,
                      isSelected && styles.selectedImageBorder,
                    ]}>
                    <Image
                      source={{uri: imageUri}}
                      style={styles.defaultImageStyle}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          {defaultImages &&
            defaultImages.map((image, idx) => {
              const isSelected = selectedImage === image.url;
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleDefaultImageSelect(image.url)}
                  style={styles.buttonStyle}>
                  <View
                    style={[
                      styles.imageContainer,
                      isSelected && styles.selectedImageBorder,
                    ]}>
                    <Image
                      source={{uri: image.url}}
                      style={styles.defaultImageStyle}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

// 배너 사진 변경
const ChangeBannerImage = ({
  defaultBanners,
  customImages,
  selectedBanner,
  handleDefaultBannerSelect,
  ShowPicker,
}) => {
  return (
    <View style={styles.changeContainer}>
      <Text style={styles.textStyle}>배너 사진 변경</Text>
      <View style={styles.imageBox}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={ShowPicker} style={styles.buttonStyle}>
            <Image
              source={IMAGES.plusSquare}
              style={styles.chooseImageStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {customImages &&
            customImages.map((imageUri, idx) => {
              const isSelected = selectedBanner === imageUri;
              return (
                <TouchableOpacity
                  key={`custom-${idx}`}
                  onPress={() => handleDefaultBannerSelect(imageUri)}
                  style={styles.buttonStyle}>
                  <View
                    style={[
                      styles.bannerContainer,
                      isSelected && styles.selectedBannerBorder,
                    ]}>
                    <Image
                      source={{uri: imageUri}}
                      style={styles.defaultBannerStyle}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          {defaultBanners &&
            defaultBanners.map((banner, idx) => {
              const isSelected = selectedBanner === banner.url;
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleDefaultBannerSelect(banner.url)}
                  style={styles.buttonStyle}>
                  <View
                    style={[
                      styles.bannerContainer,
                      isSelected && styles.selectedBannerBorder,
                    ]}>
                    <Image
                      source={{uri: banner.url}}
                      style={styles.defaultBannerStyle}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

// 상태 메시지 변경 컴포넌트
const ChangeMessage = ({currentMessage, setCurrentMessage}) => {
  const user = useRecoilValue(userState);

  const [messageLength, setMessageLength] = useState<number>(0);

  const handleMessageChange = (text: string) => {
    setCurrentMessage(text);
    setMessageLength(text.length);
  };

  const deleteMessage = () => {
    setCurrentMessage('');
  };

  return (
    <View>
      <View style={styles.inputContainer2}>
        <Text style={styles.textStyle}>
          상태 메시지 변경 {currentMessage && <Text>({messageLength}/30)</Text>}
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder={user?.message}
            placeholderTextColor="#838F8F"
            value={currentMessage}
            onChangeText={handleMessageChange}
            maxLength={30}
          />
          {currentMessage.length > 0 && (
            <TouchableOpacity
              style={styles.resetButton}
              onPress={deleteMessage}>
              <Image source={IMAGES.resetButton} style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

// 저장하기 버튼
const SaveButton = ({
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

  const submitDefaultImage = async () => {
    const authToken = authInfo.authToken;
    let successProfile = false;
    let successBanner = false;

    // 프로필 이미지 업로드
    if (selectedProfile) {
      if (isCustomImage) {
        // 사용자 업로드 이미지인 경우 Blob 코드로 전송
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
        // 프로필 기본 이미지
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

    // 배너 이미지 업로드
    if (selectedBanner) {
      if (isCustomBanner) {
        // 사용자 업로드 이미지인 경우 Blob 코드로 전송
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
        // 배너 기본 이미지
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

    // 상태 메시지 변경
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

    // 업로드 성공 여부 확인 후 모달 표시
    if (successProfile || successBanner || successMessage) {
      setUploadSuccess(true);
    } else {
      console.log('이미지 업로드 실패');
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={submitDefaultImage}>
        <LinearGradient
          colors={['rgba(31, 209, 245, 1)', 'rgba(0, 255, 150, 1)']}
          style={{
            flex: 1,
            borderRadius: 30,
            justifyContent: 'center',
            alignContent: 'center',
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Text style={styles.signUpButtonText}>저장하기</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

// 업로드 성공 메시지 모달
const SuccessModal = ({uploadSuccess, setUploadSuccess}) => {
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.navigate('Profile');
    setUploadSuccess(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={uploadSuccess}
      onRequestClose={handleClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>변경이 완료되었습니다!</Text>
          <TouchableOpacity style={styles.buttonClose} onPress={handleClose}>
            <Text style={styles.textStyle2}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // 기존 스타일 그대로 유지
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    paddingHorizontal: width * 0.05,
  },
  titleContainer: {
    backgroundColor: '#E1E6E8',
    paddingTop: 20,
    paddingLeft: 20,
  },
  titleText: {
    fontSize: 27,
    fontWeight: '600',
  },
  buttonContainer: {
    backgroundColor: '#E1E6E8',
    alignItems: 'center',
  },
  signUpButton: {
    height: height * 0.07,
    width: width * 0.5,
    marginBottom: height * 0.02,
    backgroundColor: '#E1E6E8',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    justifyContent: 'center',
    fontSize: height * 0.025,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: height * 0.07,
  },
  changeContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  textStyle: {
    color: '#838F8F',
    fontWeight: 'bold',
    fontSize: width * 0.035,
    marginBottom: 5,
  },
  textStyle2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.035,
    marginBottom: 5,
  },
  imageBox: {
    backgroundColor: '#FFFFFF',
    width: width,
    height: height * 0.15,
    marginHorizontal: -width * 0.05,
  },
  buttonStyle: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  chooseImageStyle: {
    width: width * 0.25,
    height: height * 0.125,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  defaultImageStyle: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
  },
  imageContainer: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedImageBorder: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    borderWidth: 2,
    borderColor: '#00AAB0',
  },
  bannerContainer: {
    width: width * 0.25,
    height: height * 0.12,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBannerBorder: {
    width: width * 0.25,
    height: height * 0.12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00AAB0',
  },
  defaultBannerStyle: {
    width: width * 0.25,
    height: height * 0.12,
    borderRadius: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: width * 0.8,
    maxHeight: height * 0.6,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: width * 0.05,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: height * 0.02,
    textAlign: 'left',
    fontSize: width * 0.04,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#000000',
  },
  buttonClose: {
    backgroundColor: '#1AA5AA',
    borderRadius: 4,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
  },

  inputContainer2: {
    marginTop: 0,
    paddingTop: height * 0.02,
    marginBottom: height * 0.025,
  },
  inputLabel: {
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 14,
    color: '#454545',
    marginBottom: height * 0.005,
  },
  starmark: {
    color: '#FF7360',
  },
  inputBox: {
    height: height * 0.06,
    backgroundColor: '#F4F4F4',
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#000000',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  resetButton: {
    position: 'absolute',
    right: 5,
    paddingHorizontal: 15,
  },
  clearIcon: {
    width: width * 0.04,
    height: height * 0.02,
    borderRadius: 10,
  },
});
