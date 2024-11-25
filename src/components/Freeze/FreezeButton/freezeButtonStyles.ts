import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';
export const freezeButtonStyles = StyleSheet.create({
  frozenText: {
    backgroundColor: '#12A5B0',
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.055,
    justifyContent: 'center',
    borderRadius: 3,
    paddingHorizontal: width * 0.01,
  },
  useFrozenButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.028,
    fontWeight: 'bold',
    fontFamily: `${FONT}`,
  },
  freeze: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
    marginRight: width * 0.01,
  },
});
