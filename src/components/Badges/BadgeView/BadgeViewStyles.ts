import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';

export const BadgeViewStyles = StyleSheet.create({
  badge: {
    width: 35,
    height: 35,
    marginRight: 7,
    resizeMode: 'contain',
  },
  moreButton: {
    backgroundColor: '#F5F5F5',
  },
  moreText: {
    fontSize: 20,
    color: '#009499',
    fontFamily: `${FONT}`,
  },
});
