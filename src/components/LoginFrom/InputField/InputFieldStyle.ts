import {COLOR} from "@/src/constants/styles/color/color.ts";
import {FONT} from "@/src/constants/styles/font/default-font.ts";
import {StyleSheet} from "react-native";

const commonTextStyle = {
    fontFamily: FONT,
    fontWeight: '700' as '700',
    letterSpacing: 3,
};

export const InputFieldStyles = StyleSheet.create({
    inputContainer: {
        width: '100%',
    },
    inputLabel: {
        color: '#454545',
        fontSize: 13,
        paddingBottom: 5,
        ...commonTextStyle,
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 6,
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 10,
        fontSize: 12,
        ...commonTextStyle,
        color: COLOR.BLACK,
    }
});