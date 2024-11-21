import {StyleSheet} from 'react-native';

import {FONT} from '@/src/constants/styles/font/default-font';

export const ProfileCardTitleStyles = StyleSheet.create({
  profileCardTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4b5563',
    marginBottom: 20,
    lineHeight: 30,
    fontFamily: `${FONT}`,
  },
  highlightText: {
    color: '#15D58A',
    fontWeight: '900',
    fontSize: 22,
    fontFamily: `${FONT}`,
  },
});
