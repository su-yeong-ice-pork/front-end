import {StyleSheet} from 'react-native';

import {FONT} from '@/src/constants/styles/font/default-font';
export const ProfileCardRightSectionStyles = StyleSheet.create({
  rightSection: {
    flex: 0.55,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  timerLabel: {
    fontSize: 14,
    color: '#454545',
    fontWeight: '700',
    fontFamily: `${FONT}`,
  },
  timer: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: `${FONT}`,
    color: '#14B8A6',
  },
  totalTimeLabel: {
    fontSize: 12,
    color: '#454545',
    fontWeight: '700',
    fontFamily: `${FONT}`,
    marginTop: 10,
  },
  totalTime: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: `${FONT}`,
    color: '#14B8A6',
  },
});
