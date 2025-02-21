import {Dimensions, StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
const {width, height} = Dimensions.get('window');

export const ProfileBadgeViewStyles = StyleSheet.create({
  badge: {
    width: width * 0.098,
    height: width * 0.098,
    marginRight: width * 0.01,
    resizeMode: 'contain',
  },
  badgeStackBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
  },
  moreButton: {
    backgroundColor: '#F5F5F5',
    paddingBottom: width * 0.028,
    height: height * 0.045,
  },
  moreText: {
    fontSize: width * 0.055,
    color: '#009499',
    fontFamily: `${FONT}`,
  },
});
