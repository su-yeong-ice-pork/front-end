import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';
import Header from '../components/Header';

const {width, height} = Dimensions.get('window');

const IMAGES = {
  backButton: require('../../assets/images/icons/backButton.png'),
  chooseFromGallery1: require('../../assets/images/icons/chooseFromGallery1.png'),
  chooseFromGallery2: require('../../assets/images/icons/chooseFromGallery2.png'),
};

const defaultImages = [
  require('../../assets/images/illustration/profileImage2.png'),
  require('../../assets/images/illustration/profileImage3.png'),
  require('../../assets/images/illustration/profileImage4.png'),
  require('../../assets/images/illustration/profileImage1.png'),
];

const defaulBanners = [
  require('../../assets/images/illustration/bannerImage1.png'),
  require('../../assets/images/illustration/bannerImage2.png'),
  require('../../assets/images/illustration/bannerImage4.png'),
  require('../../assets/images/illustration/bannerImage3.png'),
];

const EditProfileScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);

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
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <ChangeBannerImage
            selectedBanner={selectedBanner}
            setSelectedBanner={setSelectedBanner}
          />
        </ScrollView>
        <SaveButton />
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

// 프로필 사진 변경
const ChangeProfileImage = ({selectedImage, setSelectedImage}) => {
  return (
    <View style={styles.changeContainer}>
      <Text style={styles.textStyle}>프로필 사진 변경</Text>
      <View style={styles.imageBox}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={ShowPicker} style={styles.buttonStyle}>
            <Image
              source={IMAGES.chooseFromGallery1}
              style={styles.chooseImageStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {defaultImages.map((image, idx) => {
            const isSelected = selectedImage === image;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedImage(image)}
                style={styles.buttonStyle}>
                <View
                  style={[
                    styles.imageContainer,
                    isSelected && styles.selectedImageBorder,
                  ]}>
                  <Image
                    source={image}
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

// 사용자 앨범 접근
const ShowPicker = () => {
  launchImageLibrary({}, res => {
    // 사용자가 취소하거나 에러가 발생한 경우 처리
    if (res.didCancel || res.errorCode) {
      return;
    }
    alert(res.assets[0].uri);
    const formdata = new FormData();
    formdata.append('file', res.assets[0].uri);
    console.log(res);
  });
};

// 배너 사진 변경
const ChangeBannerImage = ({selectedBanner, setSelectedBanner}) => {
  return (
    <View style={styles.changeContainer}>
      <Text style={styles.textStyle}>프로필 사진 변경</Text>
      <View style={styles.imageBox}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={ShowPicker} style={styles.buttonStyle}>
            <Image
              source={IMAGES.chooseFromGallery2}
              style={styles.chooseImageStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {defaulBanners.map((banner, idx) => {
            const isSelected = selectedBanner === banner;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedBanner(banner)}
                style={styles.buttonStyle}>
                <View
                  style={[
                    styles.bannerContainer,
                    isSelected && styles.selectedBannerBorder,
                  ]}>
                  <Image source={banner} style={styles.defaultBannerStyle} />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

// 저장하기 버튼
const SaveButton = () => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.signUpButton}>
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

const styles = StyleSheet.create({
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
    backgroundColor: '#E1E6E8', // 여백 부분에 색상 채움
    alignItems: 'center', // 버튼을 가운데 정렬
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
    color: '#454545',
    fontWeight: '800',
    marginBottom: 10,
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
});