import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';

export const FreezeTextStyles = StyleSheet.create({
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.0005,
  },
  setiIcon: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  activeText: {
    fontFamily: `${FONT}`,
    color: '#009499',
    fontSize: 11,
  },
});
