import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font.ts';

export const EditProfileScreenStyles = StyleSheet.create({
  changeContainer: {
    marginBottom: 20,
  },
  textStyle: {
    color: '#838F8F',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    marginBottom: 7,
    fontFamily: FONT,
  },
  imageBox: {
    backgroundColor: COLOR.WHITE,
    width: width,
    height: height * 0.15,
    marginHorizontal: -width * 0.05,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
  },
  buttonStyle: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.WHITE,
    width: width * 0.3,
    marginTop: height * 0.031,
  },
  chooseImageStyle: {
    width: width * 0.25,
    height: height * 0.125,
    marginTop: height * 0.045,
    justifyContent: 'center',
  },
  imageContainer: {
    width: width * 0.25,
    height: width * 0.27,
    borderRadius: (width * 0.25) / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.045,
  },
  selectedImageBorder: {
    borderWidth: 2,
    borderColor: '#00AAB0',
  },
  defaultImageStyle: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
  },
});
