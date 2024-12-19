import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const NickNameStyles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    width: '100%',
    marginTop: 20,
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
