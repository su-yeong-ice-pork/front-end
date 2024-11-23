import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const GrassCardInfoStyles = StyleSheet.create({
  grassCardBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.01,
    marginTop: height * 0.01,
    width: width * 0.4,
    height: height * 0.25,
  },
  grassCardText: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
  },
  grassCardTextPoint: {fontSize: 15, color: '#009499'},
  grassCardImage: {
    width: width * 0.4,
    height: width * 0.25,
    resizeMode: 'contain',
  },
});
