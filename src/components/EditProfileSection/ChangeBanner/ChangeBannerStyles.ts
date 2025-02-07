import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {COLOR} from '@/src/constants/styles/color/color';
export const ChangeBannerStyles = StyleSheet.create({
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
    marginTop:height * 0.045,
  },
  bannerContainer: {
    width: width * 0.25,
    height: height * 0.12,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:height * 0.045,
  },
  selectedBannerBorder: {
    borderWidth: 2,
    borderColor: '#00AAB0',
  },
  defaultBannerStyle: {
    width: width * 0.25,
    height: height * 0.12,
    borderRadius: 10,
  },
});
