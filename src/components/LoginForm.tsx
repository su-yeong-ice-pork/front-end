import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSetRecoilState} from 'recoil';
import authState from '../recoil/authAtom';
import handleLogin from '../api/login';
import {setItem} from '../api/asyncStorage';
import Loader from './Loader';

const LoginForm = ({setIsLoading}) => {
  const navigation = useNavigation();
  const setAuthState = useSetRecoilState(authState);
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);

  const onLoginPress = async () => {
    setIsLoading(true);
    try {
      const response = await handleLogin(email, password);
      if (response.success) {
        const refreshToken = response.data.refreshToken;
        await setItem('refreshToken', refreshToken);
        if (isAutoLogin) {
          await setItem('autoLogin', 'Y');
        } else {
          await setItem('autoLogin', '');
        }
        const authToken = response.headers['authorization'];
        setAuthState({email, authToken});
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else if (response.error) {
        Alert.alert(response.error.error.message);
      }
    } catch (error) {
      console.log('오류', error.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.loginFormContainer}>
      <View style={styles.loginFormInnerContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>이메일</Text>
          <TextInput
            style={styles.input}
            placeholder="이메일을 입력해주세요."
            placeholderTextColor="#B9B9B9"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요."
            placeholderTextColor="#B9B9B9"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            ref={passwordInputRef}
            returnKeyType="done"
            onSubmitEditing={onLoginPress}
          />
          <TouchableOpacity
            style={styles.findTextContainer}
            onPress={() =>
              navigation.navigate('FindPassword', {
                title: '비밀번호 찾기',
              })
            }>
            <Text style={styles.findText}>비밀번호 찾기</Text>
          </TouchableOpacity>

          <View style={styles.autoLoginContainer}>
            <TouchableOpacity
              style={styles.customCheckboxContainer}
              onPress={() => setIsAutoLogin(!isAutoLogin)}>
              <View
                style={[
                  styles.customCheckbox,
                  isAutoLogin && styles.customCheckboxChecked,
                ]}>
                {isAutoLogin && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsAutoLogin(!isAutoLogin)}>
              <Text style={styles.optionText}>자동 로그인</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.loginButtonText}>잔디 심기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
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
