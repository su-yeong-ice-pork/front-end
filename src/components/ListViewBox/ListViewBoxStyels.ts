import {StyleSheet, Dimensions} from 'react-native';
import {FONT} from "@/src/constants/styles/font/default-font.ts";
import {COLOR} from "@/src/constants/styles/color/color.ts";

const {width, height} = Dimensions.get('window');

const mainColor = "#12A5B0"

const border = 3
const baseFontStyle = {
    fontSize: width * 0.028,
    fontWeight: '600' as '600',
    fontFamily:`${FONT}`
}

export const ListViewBoxStyles = StyleSheet.create({
    ViewBoxContainer: {
        paddingHorizontal: width * 0.03,
        marginBottom: height * 0.02,
    },

    ViewBoxTitle: {
        ...baseFontStyle,
        color: '#838F8F',
        marginBottom: 5,
    },

    ViewBoxText: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 0.055,
        width: width * 0.57,
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: width * 0.03,
        borderRadius: border,
    },

    ViewBoxIconContainer: {
        ...baseFontStyle,
        fontSize: width * 0.04,
        color: mainColor,
        marginRight: width * 0.01,
    },
    Icon: {
        width: width * 0.05,
        height: width * 0.05,
        resizeMode: 'contain',
        marginRight: width * 0.01,
    },

    ViewBoxDescription: {
        marginLeft: width * 0.01,
        fontSize: width * 0.025,
        fontWeight: '800',
        color: '#B6B6B6',
        fontFamily: `${FONT}`,
    },
    ViewBoxCount: {
        color: mainColor,
        fontSize: width*0.04,
    },

    ButtonStyle: {
        backgroundColor: mainColor,
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 0.055,
        justifyContent: 'center',
        borderRadius: border,
        paddingHorizontal: width * 0.01,
        marginLeft: width * 0.03,
    },
    ButtonText:{
        color: COLOR.WHITE,
        fontSize: width * 0.028,
        fontWeight: 'bold',
        fontFamily: `${FONT}`,
    },
});
