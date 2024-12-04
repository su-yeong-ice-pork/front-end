import {StyleSheet} from 'react-native';

import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';

export const HostBadgeStyles = StyleSheet.create({
  crown: {
    width: 12,
    height: 12,
    marginRight: 5,
    resizeMode: 'contain',
  },
  hostBadge: {
    backgroundColor: 'rgba(92, 92, 92, 0.85)',
    borderRadius: 10.5,
    paddingHorizontal: 8,
    minHeight: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  hostBadgeText: {
    fontSize: 12,
    color: `${COLOR.WHITE}`,
    fontWeight: '900',
    fontFamily: `${FONT}`,
  },
});
