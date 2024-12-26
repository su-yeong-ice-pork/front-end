import {StyleSheet} from 'react-native-css-interop';
import {Dimensions} from 'react-native';

import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

const {width, height} = Dimensions.get('window');

const ErrorMessageStyles = StyleSheet.create({
  iconAndTextContainer: {
    alignItems: 'center',
    marginTop: height * 0.005,
  },
  setiIcon: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  activeText: {
    color: COLOR.MAIN,
    fontSize: 11,
    fontFamily: FONT,
  },
});

export default ErrorMessageStyles;
