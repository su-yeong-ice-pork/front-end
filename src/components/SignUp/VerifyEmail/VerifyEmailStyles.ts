import {StyleSheet} from 'react-native';

import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const VerifyEmailStyles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
  },
  codeButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
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
