import {StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

export const NotificationListStyles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: '800',
    color: '#3f3f46',
    fontFamily: `${FONT}`,
  },
});
