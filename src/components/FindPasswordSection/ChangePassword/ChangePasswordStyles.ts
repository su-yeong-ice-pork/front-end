import {StyleSheet, Dimensions} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

const {width, height} = Dimensions.get('window');

export const ChangePasswordStyles = StyleSheet.create({
  inputContainer2: {
    marginTop: 0,
    paddingTop: height * 0.02,
    marginBottom: height * 0.025,
  },
  inputLabel: {
    fontFamily: `${FONT}`,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#454545',
    marginBottom: height * 0.005,
  },
  starmark: {
    color: '#FF7360',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputBox: {
    height: height * 0.06,
    backgroundColor: `${COLOR.WHITE}`,
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: `${COLOR.BLACK}`,
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
