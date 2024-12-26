import {Dimensions, StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
const {width, height} = Dimensions.get('window');

export const ProfileBadgeTextStyles = StyleSheet.create({
  badgeText: {
    flexDirection: 'row',
    marginTop: -(width * 0.05),
    position: 'absolute',
    fontSize: width * 0.028,
    fontWeight: 'bold',
    color: '#838F8F',
    fontFamily: `${FONT}`
  },
});
