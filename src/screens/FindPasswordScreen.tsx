// FindPassword.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import checkCode from '../api/checkCode';
import checkPasswordEmail from '../api/checkPasswordEmail';
import resetPassword from '../api/resetPassword';
import {NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX} from '../constants/regex';

const IMAGES = {
  backButton: require('../../assets/images/icons/backButton.png'),
  resetButton: require('../../assets/images/icons/resetButton.png'),
  iIcon: require('../../assets/images/icons/iIcon.png'),
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

  // 기존 이름
  const [name, setName] = useState<string>('');

  // 이메일 인증 완료 확인 변수
  const [chkEmail, setChkEmail] = useState<boolean>(false);

  // 비밀번호 재설정
  const [resetPasswordInput, setResetPasswordInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 인증 코드
  const [code, setCode] = useState<string>('');
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);

  // 이름 유효성 검사 결과
  const [nameError, setNameError] = useState<string>('');
  // 이메일 유효성 검사 결과
  const [emailError, setEmailError] = useState<string>('');

  // 헤더 제목 설정
  const headerTitle = route.params?.title || '비밀번호 찾기';

  // 기존 이름 입력
  const handleNameChange = (text: string) => {
    setName(text);
    if (!NAME_REGEX.test(text)) {
      setNameError('이름을 입력해주세요.');
    } else {
      setNameError('');
    }
  };

  // 기존 이름 지우기
  const deleteName = () => {
    setName('');
    setNameError('이름을 입력해주세요.');
  };

  // 이메일 입력
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!EMAIL_REGEX.test(text)) {
      setEmailError('유효한 부산대 이메일을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  // 이메일 지우기
  const deleteEmail = () => {
    setEmail('');
    setEmailError('유효한 부산대 이메일을 입력해주세요.');
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

  // 비밀번호 지우기
  const deletePassword = () => {
    setResetPasswordInput('');
    setErrorMessage('비밀번호를 다시 설정해주세요!');
  };

  // 비밀번호 조건 확인
  const validationPassword = (password: string) => {
    if (!PASSWORD_REGEX.test(password)) {
      setErrorMessage('비밀번호를 다시 설정해주세요!');
    } else {
      setErrorMessage('');
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000); // 1초마다 감소
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setAskCode('코드 요청'); // 타이머 종료 시 버튼 텍스트 초기화
      setIsActive(false); // 타이머 비활성화
    }
    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [isActive, timeLeft]);

  // 초를 분:초 형식으로 변환하는 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  const handleRequire = async () => {
    if (nameError || emailError || !name || !email) {
      setErrorMessage('이름과 이메일을 올바르게 입력해주세요.');
      return;
    }

    try {
      const response = await checkPasswordEmail({name, email});
      if (response.success) {
        setAskCode('재요청');
        setIsActive(true); // 타이머 시작
        setTimeLeft(300); // 타이머 리셋
        setErrorMessage('');
      } else {
        setErrorMessage('이름 또는 이메일을 확인해주세요.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || '에러가 발생했습니다.');
    }
  };

  const verifiedEmail = async () => {
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
      } else {
        setErrorMessage('인증 코드가 올바르지 않습니다.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || '에러가 발생했습니다.');
    }
  };

  // 비밀번호 재설정 API 호출
  const submitResetPassword = async () => {
    if (errorMessage || !resetPasswordInput) {
      // 에러 메시지가 있을 경우 진행하지 않음
      return;
    }
    try {
      const response = await resetPassword({
        name,
        email,
        password: resetPasswordInput,
      });
      if (response.success) {
        // 비밀번호 재설정 성공 시 로그인 페이지로 이동
        navigation.navigate('Landing');
      } else {
        setErrorMessage('비밀번호 재설정에 실패했습니다.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || '에러가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.signUpHeader}>
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={() => navigation.goBack()}>
            <Image source={IMAGES.backButton} style={styles.setBackButton} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{headerTitle}</Text>
        </View>

        {/* 입력 폼 */}
        <ScrollView
          contentContainerStyle={styles.formContainer}
          style={{backgroundColor: '#E1E6E8'}}>
          {/* 기존 이름 입력하기 */}
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
                style={[styles.inputBox]}
                placeholder="학교 이메일을 입력해주세요."
                placeholderTextColor="#B9B9B9"
                value={email}
                onChangeText={handleEmailChange}
              />
              {email.length > 0 && (
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={deleteEmail}>
                  <Image source={IMAGES.resetButton} style={styles.clearIcon} />
                </TouchableOpacity>
              )}
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
                  style={{flex: 1}}
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

          {errorMessage && !errorMessage.startsWith('비밀번호') ? (
            <View style={styles.iconAndTextContainer}>
              <Image source={IMAGES.iIcon} style={styles.setiIcon} />
              <Text style={styles.activeText}>{errorMessage}</Text>
            </View>
          ) : null}

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
        </ScrollView>

        {/* 하단 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={submitResetPassword}>
            <LinearGradient
              colors={['rgba(31, 209, 245, 1)', 'rgba(0, 255, 150, 1)']}
              style={{
                flex: 1,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <Text style={styles.signUpButtonText}>다시 잔디 심으러 가기</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FindPassword;

const styles = StyleSheet.create({
  // 기존 스타일 그대로 사용
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backButtonWrapper: {
    position: 'absolute',
    top: height * 0.01,
    left: width * 0.03,
    zIndex: 1,
    padding: 10,
  },
  setBackButton: {
    resizeMode: 'contain',
    width: width * 0.05,
    height: width * 0.05,
  },
  signUpHeader: {
    justifyContent: 'center',
    marginTop: height * 0.005,
  },
  headerText: {
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 17,
    color: '#454545',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: height * 0.02,
  },
  clearIcon: {
    width: width * 0.04,
    height: height * 0.02,
    borderRadius: 10,
  },
  formContainer: {
    paddingHorizontal: width * 0.05,
  },
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
    backgroundColor: '#F4F4F4',
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#000000',
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
  buttonContainer: {
    backgroundColor: '#E1E6E8',
    alignItems: 'center',
  },
  signUpButton: {
    height: height * 0.07,
    width: width * 0.5,
    marginBottom: height * 0.02,
    backgroundColor: '#E1E6E8',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
