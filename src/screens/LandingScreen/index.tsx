import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useSetRecoilState} from 'recoil';
import authState from '../../recoil/authAtom';

import {fetchAutoLogin} from '../../api/login/LoginApi';
import {useQuery} from '@tanstack/react-query';

import Slides from '../../components/Landing/Slides';
import LandingFooter from '../../components/Landing/LandingFooter';
import SignSection from '../../components/Landing/SignSection';

import {LANDING} from '../../constants/Landing/Landing';
import {COLOR} from '../../constants/styles/color/color';
import {LandingScreenStyles} from './LandingScreenStyles';

import Loader from '@/src/components/Loader';
import {AUTH, SIGN} from '@/src/constants/Api/Sign';

const LandingScreen = ({navigation}) => {
  const setAuthState = useSetRecoilState(authState);

  const {isLoading} = useQuery({
    queryKey: [SIGN.IN_AUTO],
    queryFn: fetchAutoLogin,
    select: async data => {
      const authToken = await data?.headers[AUTH];
      setAuthState({email: '', authToken});
      navigation.reset({
        index: 0,
        routes: [{name: LANDING.PATH_HOME}],
      });
    },
  });

  if (isLoading) {
    return <Loader />;
  }

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
