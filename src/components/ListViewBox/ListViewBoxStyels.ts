import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const ListViewBoxStyles = StyleSheet.create({
  ViewBoxTitleContainer: {marginTop: 20, marginBottom: 5},
  ViewBoxTitle: {color: '#B6B6B6', fontSize: 10, fontWeight: 'bold'},
  ViewBoxText: {
    backgroundColor: '#fff',
    width: width * 0.6,
    height: height * 0.06,
    padding: 15,
    borderRadius: 8,
  },
  ViewBoxHStack: {
    alignItems: 'center',
  },
  ViewBoxIconContainer: {
    color: '#009499',
    marginRight: 6,
  },
  ViewBoxIcon: {
    width: 20,
    height: 20,
  },
  ViewBoxDescription: {
    color: '#B6B6B6',
    fontSize: 12,
  },
  ViewBoxCount: {
    color: '#00A6AC',
    fontSize: 13,
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
  ButtonIcon: {
    marginRight: 4,
  },
});
