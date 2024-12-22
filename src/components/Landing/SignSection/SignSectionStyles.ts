import {StyleSheet} from 'react-native';

import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';

export const SignSectionStyles = StyleSheet.create({
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  rectangle4380: {
    backgroundColor: `${COLOR.WHITE}`,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 250,
    marginTop: 20,
    marginBottom: 20,
  },
  rectangle4381: {
    backgroundColor: '#009499',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 250,
  },
  signUpText: {
    fontSize: 16,
    color: '#014939',
    fontFamily: `${FONT}`,
    fontWeight: '700',
  },
  loginText: {
    fontSize: 16,
    color: `${COLOR.WHITE}`,
    fontFamily: `${FONT}`,
    fontWeight: '700',
  },
});
