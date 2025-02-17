import {Dimensions, StyleSheet} from 'react-native';
import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font.ts';

const {width, height} = Dimensions.get('window');

export const SaveButtonStyles = StyleSheet.create({
  signUpButton: {
    height: height * 0.053,
    width: width * 0.45,
    borderRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: COLOR.BACK_GROUND,
  },
  signUpButtonGradient: {
    flex: 1,
    height: height * 0.053,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: COLOR.WHITE,
    fontSize: height * 0.02,
    fontWeight: '800',
    textAlign: 'center',
    fontFamily: FONT,
  },
});
