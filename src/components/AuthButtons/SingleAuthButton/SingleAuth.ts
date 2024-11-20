import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const SingleAuthStyles = StyleSheet.create({
  button: {
    width: width * 0.4,
    height: height * 0.15,
    borderRadius: 8,
    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#86C0AE',
  },
  icon: {
    width: width * 0.3,
    height: height * 0.08,
    resizeMode: 'contain',
    marginTop: 5,
    marginLeft: 8,
  },
  text: {
    marginTop: -50,
    marginRight: 18,
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
  },
});
