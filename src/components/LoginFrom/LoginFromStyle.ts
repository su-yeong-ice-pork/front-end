import {StyleSheet} from "react-native";
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color.ts';

const subTextColor = '#5D5D5D';
const pointColor = '#009499';

const commonTextStyle = {
    fontFamily: FONT,
    fontWeight: '700' as '700',
    letterSpacing: 3,
};

export const LoginFormStyles = StyleSheet.create({
    loginFormContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    loginFormInnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    inputLabel: {
        color: '#454545',
        fontSize: 13,
        paddingBottom:5,
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
    },
    findTextContainer: {
        position: 'absolute',
        bottom: 10,
        right: 0,
    },
    findText: {
        color: subTextColor,
        ...commonTextStyle,
        fontSize: 9,
        textDecorationLine: 'underline',
    },
    autoLoginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    customCheckboxContainer: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: '#5D5D5D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        backgroundColor: COLOR.WHITE,
        borderRadius: 2,
    },
    customCheckbox: {
        width: 12,
        height: 12,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customCheckboxChecked: {
        backgroundColor: pointColor,
    },
    checkmark: {
        color: COLOR.WHITE,
        fontSize: 10,
        fontWeight: 'bold',
    },
    optionText: {
        color: subTextColor,
        fontSize: 11,
        ...commonTextStyle,
    },
    loginButton: {
        marginTop: 20,
        width: '60%',
        height: 50,
        borderRadius: 23.5,
        backgroundColor: pointColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: COLOR.WHITE,
        fontSize: 18,
        ...commonTextStyle,
    },
});