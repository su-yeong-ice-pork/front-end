import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';
export const FreezeInfoStyles = StyleSheet.create({
  frozenTitle: {
    fontSize: width * 0.028,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: 5,
    fontFamily: `${FONT}`,
  },
  infoCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frozenDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.055,
    width: width * 0.55,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width * 0.03,
    marginRight: width * 0.02,
    borderRadius: 4,
  },
  frozenDetailText: {
    marginLeft: 5,
    fontSize: width * 0.025,
    fontWeight: '800',
    color: '#B6B6B6',
    fontFamily: `${FONT}`,
  },
  frozenCount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#12A5B0',
    fontFamily: `${FONT}`,
  },
});
