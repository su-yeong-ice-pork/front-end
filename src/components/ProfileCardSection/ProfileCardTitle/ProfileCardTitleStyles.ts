import {Dimensions, StyleSheet} from 'react-native';

import {FONT} from '@/src/constants/styles/font/default-font';

const {width} = Dimensions.get('window');

export const ProfileCardTitleStyles = StyleSheet.create({
  profileCardTitle: {
    fontSize: width * 0.05,
    fontWeight: '900',
    color: '#4b5563',
    marginBottom: 20,
    lineHeight: 30,
    fontFamily: `${FONT}`,
  },
  highlightText: {
    color: '#15D58A',
    fontWeight: '900',
    fontSize: width * 0.055,
    fontFamily: `${FONT}`,
  },
});
