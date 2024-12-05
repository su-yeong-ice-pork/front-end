import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const YearCalendarStyles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 30,
  },
  calendarContainer: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
  },
  weekColumn: {
    flexDirection: 'column',
  },
  dayBox: {
    width: 12,
    height: 12,
    margin: 2,
    backgroundColor: '#ebedf0',
  },
  dayLabelsContainer: {
    marginRight: 5,
    marginTop: -15,
  },
  dayLabelText: {
    fontSize: 10,
    color: '#586069',
    marginBottom: 2,
  },
  monthLabelsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: 30,
    top: 0,
  },
  monthLabelText: {
    position: 'absolute',
    fontSize: 10,
    color: '#586069',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
