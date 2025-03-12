import {Dimensions, StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
const {width, height} = Dimensions.get('window');

export const ProfileBadgeTextStyles = StyleSheet.create({
  badgeText: {
    flexDirection: 'row',
    marginTop: -(width * 0.05),
    position: 'absolute',
    marginLeft: 2,
    fontSize: width * 0.035,
    fontWeight: 'bold',
    color: '#838F8F',
    fontFamily: `${FONT}`,
  },
});
