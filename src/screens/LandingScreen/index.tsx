import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useAutoLogin} from '@/src/hooks/useAutoLogin';

import Slides from '@/src/components/Landing/Slides';
import SignSection from '@/src/components/Landing/SignSection';
import LandingFooter from '@/src/components/Landing/LandingFooter';
import Loader from '@/src/components/Loader';

import {LANDING} from '@/src/constants/Landing/Landing';
import {LandingScreenStyles} from './LandingScreenStyles';

import {COLOR} from '@/src/constants/styles/color/color';
import {MAGIC_NUMBER} from '@/src/constants/Number/MagicNumber';

const LandingScreen = ({navigation}) => {
  const {isLoading} = useAutoLogin(() => {
    navigation.reset({
      index: MAGIC_NUMBER.ZERO,
      routes: [{name: LANDING.PATH_HOME}],
    });
  });

  return (
    <LinearGradient
      colors={COLOR.GRADIENT.TONE}
      start={COLOR.GRADIENT.START}
      end={COLOR.GRADIENT.END}
      style={LandingScreenStyles.gradient}>
      <KeyboardAwareScrollView
        style={LandingScreenStyles.keyboardAwareScrollView}
        contentContainerStyle={
          LandingScreenStyles.keyboardAwareScrollViewContent
        }
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        <Slides />

        <SignSection
          handleLogin={() => navigation.navigate(LANDING.PATH_LOGIN)}
          handleSignUp={() => navigation.navigate(LANDING.PATH_SIGN_UP)}
        />
        <LandingFooter />
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

export default LandingScreen;
