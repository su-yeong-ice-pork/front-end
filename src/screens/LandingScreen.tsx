import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSetRecoilState} from 'recoil';
import authState from '../recoil/authAtom';
import {getItem} from '../api/asyncStorage';
import {autoLogin} from '../api/login';
import Slides from '../components/Slides';

const LandingScreen = ({navigation}) => {
  const setAuthState = useSetRecoilState(authState);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const checkAutoLogin = async () => {
      const autoLoginFlag = await getItem('autoLogin');
      const refreshToken = await getItem('refreshToken');
      if (autoLoginFlag === 'Y' && refreshToken) {
        setIsLoading(true);
        const response = await autoLogin(refreshToken);
        if (response.success) {
          const authToken = response.headers['authorization'];
          setAuthState({email: '', authToken});
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        }
        setIsLoading(false);
      }
    };
    checkAutoLogin();
  }, []);

  return (
    <LinearGradient
      colors={['rgba(0, 255, 150, 1)', 'rgba(31, 209, 245, 1)']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.gradient}>
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView}
        contentContainerStyle={styles.keyboardAwareScrollViewContent}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        <Slides />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.rectangle4380}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rectangle4381}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>기존 계정으로 로그인하기</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText} numberOfLines={1} adjustsFontSizeToFit>
          계정 생성 시 잔디의{' '}
          <Text
            style={[styles.footerText, styles.underline]}
            onPress={() =>
              Linking.openURL(
                'https://sites.google.com/view/jandi-privacy/%ED%99%88',
              )
            }>
            개인정보처리방침
          </Text>{' '}
          및 이용약관에 동의하게 됩니다.
        </Text>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboardAwareScrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  keyboardAwareScrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  rectangle4380: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 250,
    marginTop: 20,
    marginBottom: 20,
  },
  rectangle4381: {
    backgroundColor: '#009499',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 250,
  },
  signUpText: {
    fontSize: 16,
    color: '#014939',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
  },
  loginText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
  },
  footerText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
