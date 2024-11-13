// FindPassword.tsx

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import checkCode from '../api/checkCode';
import checkPasswordEmail from '../api/checkPasswordEmail';
import resetPassword from '../api/resetPassword';
import {CancelAccount} from '../api/leaveAccount';
import {useRecoilValue} from 'recoil';
import authState from '../recoil/authAtom';
import {NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX} from '../constants/regex';
import Header from '../components/Header';
import Loader from '../components/Loader';
import {setItem} from '../api/asyncStorage';

const IMAGES = {
  backButton: require('../../assets/images/icons/backButton.png'),
  resetButton: require('../../assets/images/icons/resetButton.png'),
  iIcon: require('../../assets/images/icons/iIcon.png'),
  closeLogout: require('../../assets/images/icons/closeLogout.png'),
};

const {width, height} = Dimensions.get('window');

interface FindPasswordProps {
  navigation: any;
  route: any;
}

const FindPassword: React.FC<FindPasswordProps> = ({navigation, route}) => {
  const [email, setEmail] = useState<string>('');
  const [askCode, setAskCode] = useState<string>('코드 요청');
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [chkEmail, setChkEmail] = useState<boolean>(false);
  const [resetPasswordInput, setResetPasswordInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const headerTitle = route.params?.title || '비밀번호 찾기';

  // 입력 참조 (필요 시 사용)
  const passwordInputRef = useRef<TextInput>(null);

  // 이름 유효성 검사
  const handleNameChange = (text: string) => {
    setName(text);
    if (!NAME_REGEX.test(text)) {
      setNameError('이름을 입력해주세요.');
    } else {
      setNameError('');
    }
  };

  const deleteName = () => {
    setName('');
    setNameError('이름을 입력해주세요.');
  };

  // 이메일 유효성 검사
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!EMAIL_REGEX.test(text)) {
      setEmailError('유효한 부산대 이메일을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  // 인증 코드 입력
  const handleCodeChange = (text: string) => {
    setCode(text);
  };

  // 비밀번호 재설정 입력
  const handleResetPasswordChange = (password: string) => {
    setResetPasswordInput(password);
    validationPassword(password);
  };

  const deletePassword = () => {
    setResetPasswordInput('');
    setErrorMessage('비밀번호를 다시 설정해주세요!');
  };

  // 비밀번호 유효성 검사
  const validationPassword = (password: string) => {
    if (!PASSWORD_REGEX.test(password)) {
      setErrorMessage('비밀번호를 다시 설정해주세요!');
    } else {
      setErrorMessage('');
    }
  };

  // 타이머 설정
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setAskCode('코드 요청');
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  // 시간 형식 변환
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  // 코드 요청 핸들러
  const handleRequire = async () => {
    if (nameError || emailError || !name || !email) {
      setErrorMessage('이름과 이메일을 올바르게 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await checkPasswordEmail({name, email});
      if (response.success) {
        setAskCode('재요청');
        setIsActive(true);
        setTimeLeft(300);
        setErrorMessage('');
      } else {
        setErrorMessage('이름 또는 이메일을 확인해주세요.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || '이름 또는 이메일을 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 이메일 인증 확인 핸들러
  const verifiedEmail = async () => {
    setIsLoading(true);
    if (timeLeft <= 0) {
      setErrorMessage('인증 시간이 만료되었습니다. 코드를 재요청해주세요.');
      return;
    }
    try {
      const response = await checkCode({email, code});
      if (response.success) {
        setChkEmail(true);
        setIsCodeVerified(true);
        setErrorMessage('');
        setIsLoading(false);
      } else {
        setErrorMessage('인증 코드가 올바르지 않습니다.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || '인증 코드가 올바른지 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 재설정 핸들러
  const submitResetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await resetPassword({
        name: name,
        email: email,
        password: resetPasswordInput,
      });
      if (response.success) {
        console.log('비밀번호 재설정 성공');
        navigation.navigate('Landing');
      } else {
        setErrorMessage('비밀번호 재설정에 실패했습니다.');
      }
    } catch (error: any) {
      setErrorMessage(
        error.message ||
          '에러가 발생했습니다. 재설정할 비밀번호가 조건에 맞는지 확인해주세요',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        {/* 헤더 */}
        <Header Title={headerTitle} />

        {/* 입력 폼 */}
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled">
          {/* 기존 이름 입력 */}
          <View style={styles.inputContainer2}>
            <Text style={styles.inputLabel}>
              기존 이름 입력 <Text style={styles.starmark}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputBox}
                placeholder="기존에 가입되어있던 이름을 입력해주세요."
                placeholderTextColor="#B9B9B9"
                value={name}
                onChangeText={handleNameChange}
              />
              {name.length > 0 && (
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={deleteName}>
                  <Image source={IMAGES.resetButton} style={styles.clearIcon} />
                </TouchableOpacity>
              )}
            </View>
            {nameError ? (
              <View style={styles.iconAndTextContainer}>
                <Image source={IMAGES.iIcon} style={styles.setiIcon} />
                <Text style={styles.activeText}>{nameError}</Text>
              </View>
            ) : null}
          </View>

          {/* 이메일 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              학교 이메일 인증 <Text style={styles.starmark}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputBox}
                placeholder="학교 이메일을 입력해주세요."
                placeholderTextColor="#B9B9B9"
                value={email}
                onChangeText={handleEmailChange}
              />
              <TouchableOpacity
                style={styles.codeButton}
                onPress={handleRequire}>
                <Text style={styles.requestCodeButtonText}>{askCode}</Text>
              </TouchableOpacity>
            </View>
            {emailError ? (
              <View style={styles.iconAndTextContainer}>
                <Image source={IMAGES.iIcon} style={styles.setiIcon} />
                <Text style={styles.activeText}>{emailError}</Text>
              </View>
            ) : null}
            {isActive && (
              <View style={styles.iconAndTextContainer}>
                <Image source={IMAGES.iIcon} style={styles.setiIcon} />
                <Text style={styles.activeText}>
                  메일이 오지 않으셨나요? 재요청 버튼을 눌러보세요.
                </Text>
              </View>
            )}
          </View>

          {/* 인증 코드 입력 */}
          {isActive && (
            <View style={styles.inputContainer}>
              <View
                style={[
                  styles.inputRow,
                  {borderBottomWidth: 1.5, borderBottomColor: '#A9A9A9'},
                ]}>
                <TextInput
                  style={styles.codeInputBox}
                  placeholder="메일로 전송된 코드를 입력해주세요."
                  placeholderTextColor="#B9B9B9"
                  value={code}
                  onChangeText={handleCodeChange}
                />
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={verifiedEmail}>
                  <Text style={styles.verifyButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 에러 메시지 */}
          {errorMessage && !errorMessage.startsWith('비밀번호') ? (
            <View style={styles.iconAndTextContainer}>
              <Image source={IMAGES.iIcon} style={styles.setiIcon} />
              <Text style={styles.activeText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* 비밀번호 재설정 */}
          {isCodeVerified && (
            <View style={styles.inputContainer2}>
              <Text style={styles.inputLabel}>
                비밀번호 재설정 <Text style={styles.starmark}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputBox}
                  placeholder="8~16자리 입력 / 영문 대 소문자, 숫자, 특수문자 조합"
                  placeholderTextColor="#B9B9B9"
                  secureTextEntry
                  value={resetPasswordInput}
                  onChangeText={handleResetPasswordChange}
                />
                {resetPasswordInput.length > 0 && (
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={deletePassword}>
                    <Image
                      source={IMAGES.resetButton}
                      style={styles.clearIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {errorMessage ? (
                <View style={styles.iconAndTextContainer}>
                  <Image source={IMAGES.iIcon} style={styles.setiIcon} />
                  <Text style={styles.activeText}>{errorMessage}</Text>
                </View>
              ) : null}
            </View>
          )}

          {/* 회원 탈퇴 컴포넌트 */}
          {headerTitle === '비밀번호 변경하기' && (
            <LeaveAccount navigation={navigation} />
          )}
        </ScrollView>

        {/* 하단 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={submitResetPassword}>
            <LinearGradient
              colors={['rgba(31, 209, 245, 1)', 'rgba(0, 255, 150, 1)']}
              style={styles.signUpButtonGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <Text style={styles.signUpButtonText}>다시 잔디 심으러 가기</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 로딩 컴포넌트 */}
        {isLoading && <Loader />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FindPassword;

// 회원탈퇴 컴포넌트
const LeaveAccount = ({navigation}) => {
  const [showLeaveAccount, setShowLeaveAccount] = useState<boolean>(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.textWrapper}
        onPress={() => {
          setShowLeaveAccount(true);
        }}>
        <Text style={styles.underlineText}>회원탈퇴</Text>
      </TouchableOpacity>

      <LeaveAccountModal
        showLeaveAccount={showLeaveAccount}
        setShowLeaveAccount={setShowLeaveAccount}
        navigation={navigation}
      />
    </View>
  );
};

// 회원탈퇴 모달 컴포넌트
const LeaveAccountModal = ({
  showLeaveAccount,
  setShowLeaveAccount,
  navigation,
}) => {
  const authInfo = useRecoilValue(authState);
  const authToken = authInfo?.authToken;
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLeaveAccount = async () => {
    if (!authToken) {
      console.error('인증 토큰이 없습니다. 탈퇴 요청을 진행할 수 없습니다.');
      return;
    }
    try {
      const response = await CancelAccount(authToken, currentPassword);
      if (response && response.success) {
        await setItem('refreshToken', '');
        await setItem('autoLogin', '');
        setShowLeaveAccount(false);
        navigation.navigate('Landing');
      } else {
        console.error('탈퇴 요청 실패:', response?.error);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showLeaveAccount}
      onRequestClose={() => setShowLeaveAccount(false)}>
      <View style={styles.logoutModalOverlay}>
        <View style={styles.logoutModalView}>
          <View style={styles.logoutModalHeader}>
            <View style={styles.logoutModalTextWrapper}>
              <Text style={styles.logoutModalText}>정말 탈퇴하실 건가요?</Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowLeaveAccount(false)}
              style={styles.logoutModalCloseButton}>
              <Image
                source={IMAGES.closeLogout}
                style={styles.logoutModalCloseIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.logoutModalContent}>
            <Text style={styles.logoutModalDescription}>
              이렇게 가면 슬퍼요...{'\n'}
              탈퇴 버튼 누를 시 바로 회원님 모든 정보가 삭제됩니다. {'\n'}
              다시는 되돌릴 수 없습니다.
            </Text>
            {/* 비밀번호 입력 필드 */}
            <TextInput
              style={styles.passwordInput}
              placeholder="비밀번호를 입력하세요"
              placeholderTextColor="#B9B9B9"
              secureTextEntry={true}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity
              style={styles.logoutModalButton}
              onPress={handleLeaveAccount}>
              <Text style={styles.logoutModalButtonText}>네, 탈퇴할게요</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // 전체 컨테이너 스타일
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  // 헤더 스타일
  signUpHeader: {
    justifyContent: 'center',
    marginTop: height * 0.005,
    marginBottom: height * 0.02,
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
  },
  setBackButton: {
    resizeMode: 'contain',
    width: width * 0.05,
    height: width * 0.05,
  },
  headerText: {
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 17,
    color: '#454545',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // 폼 컨테이너 스타일
  formContainer: {
    paddingHorizontal: width * 0.05,
    backgroundColor: '#F5F5F5',
  },
  // 입력 컨테이너 스타일
  inputContainer: {
    marginTop: 0,
    marginBottom: height * 0.005,
  },
  inputContainer2: {
    marginTop: 0,
    paddingTop: height * 0.02,
    marginBottom: height * 0.025,
  },
  inputLabel: {
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 14,
    color: '#454545',
    marginBottom: height * 0.005,
  },
  starmark: {
    color: '#FF7360',
  },
  inputBox: {
    height: height * 0.06,
    backgroundColor: '#FFFFFF', // 흰색으로 유지
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#000000',
  },
  clearIcon: {
    width: width * 0.04,
    height: height * 0.02,
    borderRadius: 10,
  },
  codeInputBox: {
    flex: 1,
    backgroundColor: '#FFFFFF', // 흰색으로 유지
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  requestCodeButton: {
    marginLeft: width * 0.02,
    backgroundColor: '#009499',
    borderRadius: 25,
    paddingHorizontal: width * 0.04,
    justifyContent: 'center',
    height: height * 0.05,
  },
  requestCodeButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    borderRadius: 20,
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.0005,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  codeButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#009499',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  resetButton: {
    position: 'absolute',
    right: 5,
    paddingHorizontal: 15,
  },
  activeText: {
    fontFamily: 'NanumSquareNeo-aLt',
    color: '#009499',
    fontSize: 11,
  },
  setiIcon: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  verifyButton: {
    marginLeft: width * 0.02,
    backgroundColor: '#009499',
    borderRadius: 20,
    paddingHorizontal: width * 0.04,
    justifyContent: 'center',
    height: height * 0.04,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  timerText: {
    marginLeft: 10,
    color: '#FF7777',
    fontSize: 12,
    textAlign: 'right',
  },
  // 버튼 컨테이너 스타일
  buttonContainer: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  signUpButton: {
    height: height * 0.07,
    width: width * 0.5,
    marginBottom: 20,
    borderRadius: 30,
    overflow: 'hidden', // LinearGradient가 버튼 영역을 벗어나지 않도록
  },
  signUpButtonGradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // 모달 스타일
  logoutModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoutModalView: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  logoutModalHeader: {
    flexDirection: 'row',
    backgroundColor: '#009499',
    height: 50,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
  },
  logoutModalTextWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutModalText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  logoutModalCloseButton: {
    position: 'absolute',
    right: 10,
  },
  logoutModalCloseIcon: {
    width: 20,
    height: 20,
  },
  logoutModalContent: {
    padding: 20,
    alignItems: 'center',
  },
  logoutModalDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '800',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#000000',
  },
  logoutModalButton: {
    backgroundColor: '#009499',
    borderRadius: 20,
    width: width * 0.3,
    padding: 10,
  },
  passwordInput: {
    width: '100%',
    height: 40,
    borderColor: '#B9B9B9',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF', // 입력 필드 흰색 유지
  },
  logoutModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  // 회원 탈퇴 텍스트 스타일
  textWrapper: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  underlineText: {
    textDecorationLine: 'underline',
    color: '#B9B9B9',
  },
});
