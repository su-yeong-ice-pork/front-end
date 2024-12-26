import {StyleSheet, Dimensions} from 'react-native';

import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

const {width, height} = Dimensions.get('window');

export const SignUpHeaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height * 0.02,
  },
  formContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.3, // Increased to ensure space for the button
  },
  welcomeText: {
    fontFamily: FONT,
    fontWeight: '800',
    fontSize: 24,
    color: '#3E3E3E',
    paddingTop: height * 0.02,
  },
  inlineText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
  },
  codeButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: COLOR.MAIN,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
