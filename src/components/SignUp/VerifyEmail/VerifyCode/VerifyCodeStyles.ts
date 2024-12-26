import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native-css-interop';

import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

const {width, height} = Dimensions.get('window');

export const VerifyCodeStyles = StyleSheet.create({
  inputContainer: {
    paddingTop: 10,
    position: 'relative',
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    borderBottomWidth: 1.5,
    borderBottomColor: '#A9A9A9',
  },
  inputText: {
    flex: 1,
  },
  timerText: {
    color: '#FF7777',
    fontSize: 12,
    textAlign: 'right',
    fontFamily: FONT,
    fontWeight: '700',
  },
  verifyButton: {
    marginLeft: width * 0.02,
    backgroundColor: COLOR.MAIN,
    borderRadius: 20,
    paddingHorizontal: width * 0.04,
    justifyContent: 'center',
    height: height * 0.04,
  },
  verifyButtonText: {
    color: COLOR.WHITE,
    fontSize: 12,
    fontFamily: FONT,
    fontWeight: '600',
  },
});
