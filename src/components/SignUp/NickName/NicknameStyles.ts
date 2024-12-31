import {StyleSheet} from 'react-native';

import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

export const NickNameStyles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    width: '100%',
    marginTop: 20,
  },
  codeButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    backgroundColor: COLOR.MAIN,
    borderRadius: 20,
  },
  requestCodeButtonText: {
    color: COLOR.WHITE,
    fontSize: 11,
    borderRadius: 20,
    fontFamily: FONT,
  },
});
