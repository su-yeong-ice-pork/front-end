import {StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

export const HomeBadgeTextStyles = StyleSheet.create({
  badgeText: {
    fontSize: 13,
    color: '#777',
    flexDirection: 'row',
    marginTop: -30,
    position: 'absolute',
    fontFamily: `${FONT}`,
    fontWeight: 'bold',
  },
});
