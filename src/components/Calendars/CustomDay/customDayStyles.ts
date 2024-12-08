import {StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

export const CutomDayStyles = StyleSheet.create({
  dayContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  selectedDay: {
    borderWidth: 2,
    borderColor: '#1AA5AA',
  },
  dayText: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    fontFamily: `${FONT}`,
    fontWeight: 'bold',
  },
  defaultDayContainer: {
    backgroundColor: '#E0E0E0',
  },
  todayText: {
    color: '#FF6347',
  },
  dayImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
