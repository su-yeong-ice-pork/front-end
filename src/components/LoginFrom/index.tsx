import React, {useState, useRef} from 'react';
import {TouchableOpacity} from 'react-native';

import {Box, VStack, HStack, Text} from '@/components/ui/index.ts'

import {useNavigation} from '@react-navigation/native';
import {useSetRecoilState} from 'recoil';
import authState from '../../recoil/authAtom';
import handleLogin from '../../api/login/LoginApi';
import {setItem} from '../../api/asyncStorage';
import {useMutation} from '@tanstack/react-query';

import {LoginFormStyles} from './../LoginFrom/LoginFromStyle.ts';
import {LoginPropsType} from "@/src/api/login/LoginPropsType.ts";
import {LoginFormProps} from "@/src/components/types/LoginFormType/LoginFormType.ts";
import {InputField} from "../LoginFrom/InputField/index.tsx";

import {LOGIN_ERROR_MESSAGE,LOGIN_FORM_MESSAGE} from "@/src/constants/LoginFrom/LoginForm.ts";


const LoginForm: React.FC<LoginFormProps> = ({setIsLoading}) => {
    const navigation = useNavigation();
    const setAuthState = useSetRecoilState(authState);
    const [isAutoLogin, setIsAutoLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordInputRef = useRef(null);

    const mutation = useMutation({
        mutationFn: ({email, password}: LoginPropsType) =>
            handleLogin({email, password}),
    });

    const onLoginPress = async () => {
        setIsLoading(true);
        try {
            mutation.mutate(
                {
                    email: email,
                    password: password,
                },
                {
                    onSuccess: async data => {
                        console.log(data);
                        const refreshToken = data?.data?.refreshToken;
                        console.log(refreshToken);
                        await setItem('refreshToken', refreshToken);
                        if (isAutoLogin) {
                            await setItem('autoLogin', 'Y');
                        } else {
                            await setItem('autoLogin', '');
                        }
                        const authToken = data.headers['authorization'];
                        setAuthState({email, authToken});
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'Home'}],
                        });
                    },
                    onError: error => {
                        console.log(
                            LOGIN_ERROR_MESSAGE.ERROR,
                            error.message || LOGIN_ERROR_MESSAGE.ERROR_MESSAGE,
                        );
                    },
                },
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box style={LoginFormStyles.loginFormContainer}>
            <VStack style={LoginFormStyles.loginFormInnerContainer}>
                <InputField
                    label={LOGIN_FORM_MESSAGE.EMAIL.LABEL}
                    placeholder={LOGIN_FORM_MESSAGE.EMAIL.PLACEHOLDER}
                    value={email}
                    onChangeText={setEmail}
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                />
                <VStack style={LoginFormStyles.paddingBox}></VStack>
                <VStack style={LoginFormStyles.passwardContainer}>
                    <InputField
                        label={LOGIN_FORM_MESSAGE.PASSWORD.LABEL}
                        placeholder={LOGIN_FORM_MESSAGE.PASSWORD.PLACEHOLDER}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        onSubmitEditing={onLoginPress}
                        ref={passwordInputRef}
                    />
                    <TouchableOpacity
                        style={LoginFormStyles.findTextContainer}
                        onPress={() =>
                            navigation.navigate('FindPassword', {
                                title: LOGIN_FORM_MESSAGE.FIND_PASSWORD,
                            })
                        }>
                        <Text style={LoginFormStyles.findText}>{LOGIN_FORM_MESSAGE.FIND_PASSWORD}</Text>
                    </TouchableOpacity>

                    <HStack style={LoginFormStyles.autoLoginContainer}>
                        <TouchableOpacity
                            style={LoginFormStyles.customCheckboxContainer}
                            onPress={() => setIsAutoLogin(!isAutoLogin)}>
                            <Box
                                style={[
                                    LoginFormStyles.customCheckbox,
                                    isAutoLogin && LoginFormStyles.customCheckboxChecked,
                                ]}>
                                {isAutoLogin && <Text style={LoginFormStyles.checkmark}>✓</Text>}
                            </Box>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsAutoLogin(!isAutoLogin)}>
                            <Text style={LoginFormStyles.optionText}>{LOGIN_FORM_MESSAGE.AUTO_LOGIN}</Text>
                        </TouchableOpacity>
                    </HStack>
                </VStack>
                <VStack style={LoginFormStyles.paddingBox}></VStack>
                <TouchableOpacity
                    style={LoginFormStyles.loginButton}
                    onPress={() => onLoginPress()}>
                    <Text style={LoginFormStyles.loginButtonText}>{LOGIN_FORM_MESSAGE.LOGIN_BUTTON_TEXT}</Text>
                </TouchableOpacity>
            </VStack>
        </Box>
    );
};

export default LoginForm;

