import {Dimensions, StyleSheet} from "react-native";
const {width, height} = Dimensions.get('window');

export const ProfileBadgeStyles = StyleSheet.create({
    badgeContainer: {
        maxWidth: width*0.5,
        paddingHorizontal: width * 0.03,
        color: '#009499',
        height: height * 0.047,
    },
});