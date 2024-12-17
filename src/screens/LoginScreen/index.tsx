import React, {useState} from 'react';

import {LoginScreenStyles} from './LoginScreenStyle.ts';

import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoginForm from '../../components/LoginFrom/index.tsx';
import Loader from '../../components/Loader';
import Slides from '../../components/Landing/Slides';

import {COLOR} from '../../constants/styles/color/color.ts';

const LoginScreen = ({}) => {
    return (
        <LinearGradient
            colors={COLOR.GRADIENT.TONE}
            start={COLOR.GRADIENT.START}
            end={COLOR.GRADIENT.END}
            style={LoginScreenStyles.gradient}>
            <KeyboardAwareScrollView
                style={LoginScreenStyles.keyboardAwareScrollView}
                contentContainerStyle={
                    LoginScreenStyles.keyboardAwareScrollViewContent
                }
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled"
                bounces={false}>
                <Slides/>

                <LoginForm/>
            </KeyboardAwareScrollView>
        </LinearGradient>
    );
};

export default LoginScreen;
