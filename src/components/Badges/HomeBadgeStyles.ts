import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export const HomeBadgeStyles = StyleSheet.create({
  badgeContainer: {
    flexDirection: 'row',
    marginLeft: width * 0.15,
    color: '#009499',
    position: 'relative',
  },
});
