import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const GroupAuthStyles = StyleSheet.create({
  button: {
    width: width * 0.4,
    height: height * 0.15,
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    alignItems: 'center',
    backgroundColor: '#2C74A2',
  },
  icon: {
    width: width * 0.3,
    height: height * 0.08,
    resizeMode: 'contain',
    marginTop: 5,
    marginLeft: 60,
  },
  text: {
    marginTop: -50,
    marginLeft: 24,
    width: width * 0.5,
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
  },
});
