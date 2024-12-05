import {StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

export const DayCountStyle = StyleSheet.create({
  currentDaySection: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  notDayCount: {
    marginTop: 15,
    fontSize: 17,
    marginLeft: 17,
    marginHorizontal: 10,
    fontFamily: `${FONT}`,
    fontWeight: 'bold',
  },
  dayCount: {
    fontSize: 19,
    color: '#009499',
    fontFamily: `${FONT}`,
    fontWeight: 'bold',
  },
  currentDayText: {
    fontSize: 18,
    marginBottom: -10,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: `${FONT}`,
  },
});
