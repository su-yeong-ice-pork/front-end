import {StyleSheet,Dimensions} from 'react-native';
import {FONT} from "@/src/constants/styles/font/default-font.ts";
const {width, height} = Dimensions.get('window');

export const GrassTitleStyles = StyleSheet.create({
  grassTitleBox: {
    marginTop: height*0.04,
    marginBottom: height*0.01
  },
  highlightText: {
    fontSize: width * 0.056,
    fontWeight: 900,
    fontFamily: `${FONT}`,
    color: '#009499',
  },
  titleText:{
    fontSize: width * 0.05,
    fontWeight: 600,
    fontFamily: `${FONT}`,
  }
});
