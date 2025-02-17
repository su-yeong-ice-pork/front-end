import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color.ts'

const fontSize10 = width * 0.028;
;
export const GrassCardInfoStyles = StyleSheet.create({
  grassCardBox: {
    backgroundColor: COLOR.WHITE,
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
    color: COLOR.BLACK,
    fontSize: fontSize10,
    textAlign: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    fontFamily: `${FONT}`,
    lineHeight: height * 0.021,
    fontWeight:"400"
  },
  grassCardTextPoint: {
    color: '#009499',
    fontSize: fontSize10+2,
    fontFamily: `${FONT}`,
    fontWeight:"600"
  },
  grassCardImage: {
    width: width * 0.4,
    height: width * 0.25,
    resizeMode: 'contain',
  },
});
