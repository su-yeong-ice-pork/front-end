import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native-css-interop';

import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

const {height} = Dimensions.get('window');

export const InputBoxStyles = StyleSheet.create({
  inputLabel: {
    fontFamily: FONT,
    fontWeight: '600',
    fontSize: 14,
    color: '#454545',
    marginBottom: height * 0.005,
  },
  starmark: {
    color: '#FF7360',
  },
  inputBox: {
    height: height * 0.06,
    width: '100%',
    minHeight: 50,
    backgroundColor: '#F4F4F4',
    borderRadius: 6,
    paddingVertical: 5,
    justifyContent: 'center',
    fontFamily: FONT,
    fontSize: 12,
    color: COLOR.BLACK,
  },
  placeholderText: {
    color: '#B9B9B9',
  },
});
