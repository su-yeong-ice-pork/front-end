import {Dimensions, StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color.ts';

const {width, height} = Dimensions.get('window');

export const SubmitButtonStyles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: '70%',
    height: height * 0.15,
    objectFit: 'contain',
    marginBottom: -10,
  },
  button: {
    width: width * 0.565,
    borderRadius: 27.5,
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B1C1C2',
  },
  buttonText: {
    fontFamily: FONT,
    color: COLOR.WHITE,
    fontSize: height * 0.021,
    fontWeight: '800',
  },
});
