import {StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

export const HomeBadgeViewStyles = StyleSheet.create({
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
