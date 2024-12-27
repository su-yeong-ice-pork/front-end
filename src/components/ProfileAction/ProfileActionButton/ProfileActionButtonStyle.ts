import {Dimensions, StyleSheet} from "react-native";
import {COLOR} from "@/src/constants/styles/color/color.ts";
import {FONT} from "@/src/constants/styles/font/default-font.ts";

const {width, height} = Dimensions.get('window');

export const Pixsel10 = width*0.028
export const ProfileActionButtonStyles = StyleSheet.create({
  buttonBox: {
    width: width,
    height: height * 0.05,
    backgroundColor: COLOR.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: Pixsel10 * 2,
    height: Pixsel10 * 2,
    marginHorizontal: Pixsel10 * 0.1,
    marginRight: Pixsel10 * 0.7,
    resizeMode: 'contain',
  },
  text: {
    color: COLOR.BLACK,
    fontSize: width * 0.035,
    fontWeight: 500,
    fontFamily: `${FONT}`,
  }
});