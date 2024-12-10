import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoginForm from '../components/LoginForm';
import Loader from '../components/Loader';
import Slides from '../components/Landing/Slides';

const LoginScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
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
        <LoginForm setIsLoading={setIsLoading} />
      </KeyboardAwareScrollView>
      {isLoading && <Loader />}
    </LinearGradient>
  );
};

export default LoginScreen;

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
});
