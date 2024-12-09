import {StyleSheet} from 'react-native';

import {FONT} from '@/src/constants/styles/font/default-font';

export const LandingFooterStyle = StyleSheet.create({
  footerText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    fontFamily: `${FONT}`,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
