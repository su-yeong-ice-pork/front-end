import {StyleSheet, Dimensions} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

const {width} = Dimensions.get('window');

export const AlarmScreenStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#e4e4e7',
  },
  contentContainer: {
    paddingBottom: 80,
  },
  content: {
    width: '100%',
    maxWidth: 480,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  footerText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 12,
    fontWeight: '700',
    color: '#737373',
    fontFamily: `${FONT}`,
  },
});
