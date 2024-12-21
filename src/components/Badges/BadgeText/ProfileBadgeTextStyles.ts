import {StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

export const ProfileBadgeTextStyles = StyleSheet.create({
  badgeText: {
    fontSize: 10,
    // color: '#777',
    color: 'red',
    flexDirection: 'row',
    marginTop: -30,
    position: 'absolute',
    fontFamily: `${FONT}`,
    fontWeight: 'bold',
  },
});
