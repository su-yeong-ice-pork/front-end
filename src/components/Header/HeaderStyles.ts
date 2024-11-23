import {FONT} from '@/src/constants/styles/font/default-font';
import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const HeaderStyles = StyleSheet.create({
  headerContainer: {
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  backButtonWrapper: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: width * 0.03,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  backButtonIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 17,
    color: '#454545',
    fontWeight: 'bold',
    fontFamily: `${FONT}`,
    textAlign: 'center',
  },
});
