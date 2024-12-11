import {StyleSheet} from "react-native";

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
        fontFamily: 'NanumSquareNeo-Variable',
        fontWeight: '700',
        fontSize: 13,
        lineHeight: 20,
        letterSpacing: 3,
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 6,
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 10,
        fontSize: 12,
        fontFamily: 'NanumSquareNeo-Variable',
        fontWeight: '700',
        letterSpacing: 3,
        color: '#000000',
    },
    findTextContainer: {
        position: 'absolute',
        bottom: 10,
        right: 0,
    },
    findText: {
        color: '#5D5D5D',
        fontFamily: 'NanumSquareNeo-Variable',
        fontWeight: '700',
        fontSize: 9,
        textDecorationLine: 'underline',
        letterSpacing: 3,
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
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#009499',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    optionText: {
        color: '#5D5D5D',
        fontFamily: 'NanumSquareNeo-Variable',
        fontWeight: '700',
        fontSize: 11,
        letterSpacing: 3,
    },
    loginButton: {
        marginTop: 20,
        width: '60%',
        height: 50,
        borderRadius: 23.5,
        backgroundColor: '#009499',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontFamily: 'NanumSquareNeo-Variable',
        fontWeight: '700',
        fontSize: 18,
        letterSpacing: 3,
    },
});