import {StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

export const RankingSectionStyles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    color: '#454545',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: `${FONT}`,
  },
});
