import {Dimensions, StyleSheet} from "react-native";
import {COLOR} from "../../constants/styles/color/color.ts"
const {width, height} = Dimensions.get('window');

export const ProfileBadgeStyles = StyleSheet.create({
    badgeContainer: {
        display:'flex',
        paddingHorizontal: width * 0.03,
        paddingTop : height * 0.005,
        color: '#009499',
        backgroundColor: COLOR.WHITE,
        height: height * 0.055,
        borderRadius: 4,
        width: 'auto',
    },
});