import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';

export const BadgeTextStyles = StyleSheet.create({
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
