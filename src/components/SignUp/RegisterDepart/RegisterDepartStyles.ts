import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

export const RegisterDepartStyles = StyleSheet.create({
  inputContainer: {
    marginTop: height * 0.02,
  },
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
    minHeight: 50,
    backgroundColor: '#F4F4F4',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    fontFamily: FONT,
    fontWeight: '600',
    fontSize: 12,
    color: COLOR.BLACK,
    width: '100%',
  },
  placeholderText: {
    color: '#B9B9B9',
  },
  selectedText: {
    color: '#000000',
  },
});
