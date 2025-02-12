import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font.ts';

export const ChangeMessageStyles = StyleSheet.create({
  inputContainer2: {
    marginTop: 0,
    paddingTop: height * 0.02,
    height: height * 0.125,
  },
  textStyle: {
    color: '#838F8F',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    marginBottom: 7,
    fontFamily: FONT,
  },
  inputBox: {
    height: height * 0.15,
    fontSize: 12,
    backgroundColor: COLOR.WHITE,
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#000000',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
    height: height * 0.058,
    backgroundColor: COLOR.WHITE,
    borderRadius: 6,
    paddingHorizontal: width * 0.046,
    marginBottom: 5,
    alignItems: 'center',
  },
  resetButton: {
    position: 'absolute',
    right: 5,
    paddingHorizontal: 15,
    backgroundColor: COLOR.WHITE,
  },
  clearIcon: {
    width: width * 0.05,
    height: height * 0.025,
    borderRadius: 10,
  },
});
