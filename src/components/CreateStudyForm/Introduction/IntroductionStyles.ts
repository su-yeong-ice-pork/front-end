import {Dimensions, StyleSheet} from "react-native";
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color.ts';
const {height} = Dimensions.get('window');

const commonTextStyle = {
  fontFamily: FONT,
  fontSize: height * 0.02,
  color: COLOR.WHITE,
};

export const IntroductionStyles = StyleSheet.create({

  introductionContainer: {
    margin: height * 0.035,
  },
  introduction1: {
    ...commonTextStyle,
    fontWeight: '500',
    marginBottom: height * 0.005,
  },
  introduction2: {
    ...commonTextStyle,
    fontSize: height * 0.023,
    fontWeight: '900',
  },
  introduction3: {
    ...commonTextStyle,
    fontWeight: '500',
  },
});
