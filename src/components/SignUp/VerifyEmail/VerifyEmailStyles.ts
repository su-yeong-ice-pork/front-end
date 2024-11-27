import {StyleSheet} from 'react-native';

export const VerifyEmailStyles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  codeButton: {
    position: 'absolute',
    right: 10,
    top: 35,
    backgroundColor: '#009499',
    borderRadius: 20,
  },
  requestCodeButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    borderRadius: 20,
    fontFamily: 'NanumSquareNeo-Variable',
  },
});
