import React, {useRef, useState, useEffect} from 'react';
import authState from '../recoil/authAtom';
import {useSetRecoilState} from 'recoil';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import handleLogin, {autoLogin} from '../api/login';
import {setItem, getItem} from '../api/asyncStorage';
import Loader from '../components/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'; // KeyboardAwareScrollView 임포트

const IMAGES = {
  blueGrass:
    'https://image-resource.creatie.ai/137927998611751/137927998611753/35fcb8e3152553006e3d0339a4456494.png',
  slide1Image: require('../../assets/images/illustration/intro.png'),
  slide2Image: require('../../assets/images/illustration/introTwo.png'),
  slide3Image: require('../../assets/images/illustration/introThree.png'),
  slide4Image: require('../../assets/images/illustration/introFour.png'),
};

const {width, height} = Dimensions.get('window');

const LandingScreen = ({navigation}) => {
  const setAuthState = useSetRecoilState(authState);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false); // 자동 로그인 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  useEffect(() => {
    const checkAutoLogin = async () => {
      const autoLoginFlag = await getItem('autoLogin');
      const refreshToken = await getItem('refreshToken');
      if (autoLoginFlag === 'Y' && refreshToken) {
        const response = await autoLogin(refreshToken);
        if (response.success) {
          const authToken = response.headers['authorization'];
          setAuthState({email: '', authToken});
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        }
      }
    };
    checkAutoLogin();
  }, []);

  // 로그인 버튼을 누르면
  const onLoginPress = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      const response = await handleLogin(email, password);
      if (response.success) {
        // 로그인 성공 시
        const refreshToken = response.data.refreshToken;
        await setItem('refreshToken', refreshToken);
        if (isAutoLogin) {
          // 자동 로그인 정보 저장
          await setItem('autoLogin', 'Y');
        } else {
          // 자동 로그인 정보 삭제
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
      setIsLoading(false); // 로딩 종료
    }
  };

  const slides = [
    {
      key: 'slide1',
      mainText: (
        <>
          도서관 출석,{'\n'}
          <Text style={styles.highlight}>잔디</Text>처럼 쌓이는 성취감!
        </>
      ),
      subText:
        '매일 도서관에 출석할 때마다\n성장하는 나만의 잔디밭을 완성해 보세요!',
      additionalElements: (
        <>
          <Image source={IMAGES.slide1Image} style={styles.slideImage} />
        </>
      ),
    },
    {
      key: 'slide2',
      mainText: (
        <>
          함께 인증하고, {'\n'}함께 성장하는 {'\n'}
          <Text style={styles.highlight}>도서관 출석 스터디</Text>
        </>
      ),
      subText:
        '위치 인증과 스터디원들의 상호 인증으로,\n재미있고 꾸준한 도서관 생활을 만들어가요!',
      additionalElements: (
        <>
          <Image source={IMAGES.slide2Image} style={styles.slideImage} />
        </>
      ),
    },
    {
      key: 'slide3',
      mainText: (
        <>
          출석도 게임처럼! {'\n'}
          <Text style={styles.highlight}>티어</Text>와{' '}
          <Text style={styles.highlight}>레이팅</Text>으로 {'\n'}즐겁게
          도전하세요!
        </>
      ),
      subText:
        '도서관 출석으로 나만의 티어를 쌓고,\n목표를 향한 여정을 재미있게 꾸며보세요!',
      additionalElements: (
        <>
          <Image source={IMAGES.slide3Image} style={styles.slideImage} />
        </>
      ),
    },
    {
      key: 'slide4',
      mainText: (
        <>
          매일 <Text style={styles.highlight}>잔디</Text>를 심으며, {'\n'}함께
          목표를 {'\n'}이루는 스터디!
        </>
      ),
      subText:
        '하루하루 쌓이는 잔디와 함께 도서관에서\n목표를 이루는 나를 만나세요!',
      additionalElements: (
        <>
          <Image source={IMAGES.slide4Image} style={styles.slideImage} />
        </>
      ),
    },
  ];

  const renderSlide = ({item, index}) => (
    <View style={styles.slide} key={index}>
      <Text style={styles.mainText}>{item.mainText}</Text>
      <Text style={styles.subText}>{item.subText}</Text>
      {item.additionalElements}
    </View>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const handleScrollEnd = e => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  return (
    <LinearGradient
      colors={['rgba(0, 255, 150, 1)', 'rgba(31, 209, 245, 1)']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onMomentumScrollEnd={handleScrollEnd}>
        {slides.map((item, index) => renderSlide({item, index}))}
      </ScrollView>

      <View style={styles.paginationContainer}>
        {slides.map((_, i) => {
          let opacity = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={i} style={[styles.dot, {opacity}]} />;
        })}
      </View>

      {!showLoginForm && (
        // 로그인 폼이 보이지 않을 때만 버튼들을 렌더링합니다.
        <>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.rectangle4380}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rectangle4381}
              onPress={() => setShowLoginForm(true)}>
              <Text style={styles.loginText}>기존 계정으로 로그인하기</Text>
            </TouchableOpacity>
          </View>

          <Text
            style={styles.footerText}
            numberOfLines={1}
            adjustsFontSizeToFit>
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
        </>
      )}

      {showLoginForm && (
        // KeyboardAwareScrollView로 로그인 폼 감싸기
        <KeyboardAwareScrollView
          contentContainerStyle={styles.loginFormContainer}
          enableOnAndroid={true}
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled">
          <View style={styles.loginFormInnerContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>아이디</Text>
              <TextInput
                style={styles.input}
                placeholder="아이디를 입력해주세요."
                placeholderTextColor="#B9B9B9"
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.passwordInput.focus();
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
                ref={input => (this.passwordInput = input)}
                returnKeyType="done"
                onSubmitEditing={onLoginPress}
              />
              <TouchableOpacity
                style={styles.findTextContainer}
                onPress={() =>
                  navigation.navigate('FindPassword', {title: '비밀번호 찾기'})
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
        </KeyboardAwareScrollView>
      )}

      {isLoading && <Loader />}
    </LinearGradient>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // 고정된 width와 height 제거
    justifyContent: 'flex-start',
    paddingHorizontal: 0, // 패딩 제거
  },
  slide: {
    width: width, // 화면 전체 너비 사용
    justifyContent: 'center',
    paddingTop: 0,
    marginBottom: 0,
  },
  mainText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '900',
    textAlign: 'left',
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  subText: {
    fontSize: 16,
    color: '#378260',
    fontFamily: 'NanumSquareNeo-Variable',
    textAlign: 'left',
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  highlight: {
    color: '#00470D',
  },
  slideImage: {
    width: '90%',
    height: '35%',
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 0,
    alignSelf: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#009499',
    marginHorizontal: 5,
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
  loginFormContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  loginFormInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20, // 기본 여백 유지
  },
  inputLabel: {
    color: '#454545',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 40,
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
    bottom: 10, // 입력 필드 바로 아래에 위치하도록 조정
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
  // 자동 로그인 컨테이너
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
    backgroundColor: '#FFFFFF', // 기본 흰색 배경
    borderRadius: 2, // 약간의 둥글게
  },
  customCheckbox: {
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customCheckboxChecked: {
    backgroundColor: '#009499', // 체크되었을 때 색상
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
