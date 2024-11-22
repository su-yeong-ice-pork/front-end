import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const ListViewBoxStyles = StyleSheet.create({
  ViewBoxTitle: {
    backgroundColor: '#fff',
    width: width * 0.6,
    height: height * 0.06,
    padding: 15,
    borderRadius: 8,
  },
  buttonStyle: {
    width: width * 0.3,
    height: height * 0.06,
    padding: 12,
    marginLeft: 10,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    backgroundColor: '#009499',
  },
});
