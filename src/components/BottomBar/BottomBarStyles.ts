import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const BottomBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    width: width,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    resizeMode: 'contain',
  },
});
