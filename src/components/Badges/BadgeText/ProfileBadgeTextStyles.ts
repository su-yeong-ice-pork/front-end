import {StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

export const ProfileBadgeTextStyles = StyleSheet.create({
  badgeText: {
    flexDirection: 'row',
    marginTop: -17,
    position: 'absolute',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#838F8F',
    fontFamily: `${FONT}`
  },
});
