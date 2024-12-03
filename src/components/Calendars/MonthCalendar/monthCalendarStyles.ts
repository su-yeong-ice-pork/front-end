import {StyleSheet, Dimensions} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

export const MonthCalendarStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  monthlyContainer: {
    flex: 1,
    padding: 10,
  },
  yearlyView: {
    flex: 1,
    padding: 20,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CB6A9',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabContent: {
    alignItems: 'center',
  },
  activeIndicator: {
    width: 80,
    height: 3,
    borderRadius: 40,
    alignItems: 'flex-end',
  },
  borderLine: {
    width: '100%',
    height: 4,
    borderRadius: 2,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginTop: 7,
  },
  tabText: {
    fontSize: 15,
    marginTop: 15,
    color: '#B0D8D3',
    fontFamily: `${FONT}`,
  },
  activeTabText: {
    fontSize: 15,
    marginTop: 10,
    color: '#FFFFFF',
    fontFamily: `${FONT}`,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerYearText: {
    color: '#009499',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerMonthText: {
    color: '#009499',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  headerArrows: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  arrowButton: {
    padding: 10,
    backgroundColor: 'white',
  },
  arrowText: {
    color: '#009499',
    fontSize: 24,
    fontFamily: `${FONT}`,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#009499',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: `${FONT}`,
  },
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
