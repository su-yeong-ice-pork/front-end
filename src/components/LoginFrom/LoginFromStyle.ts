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
        marginBottom: 40,
    },
    loginFormInnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    passwardContainer:{
        width: '100%',
    },
    paddingBox: {
        height: 20
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