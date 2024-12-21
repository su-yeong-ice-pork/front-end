import {Dimensions, StyleSheet} from "react-native";
const {width, height} = Dimensions.get('window');


export const ProfileBadgeStyles = StyleSheet.create({
    badgeContainer: {
        paddingHorizontal: width * 0.03,
        marginBottom: height * 0.02,
        //flexDirection: 'row',
        //marginLeft: width * 0.15,
        color: '#009499',
        //position: 'relative',
        backgroundColor: 'red'
    },
});