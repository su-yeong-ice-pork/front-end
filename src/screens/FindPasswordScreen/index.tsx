import React from 'react';
import {
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import NameInput from '@/src/components/FindPasswordSection/NameInput';
import {FIND_PASSWORD} from '@/src/constants/FindPassword/FindPassword';
import EmailInput from '@/src/components/FindPasswordSection/EmailInput';
import VerifyCodeInput from '@/src/components/FindPasswordSection/VerifyCodeInput';
import ErrorMessage from '@/src/components/FindPasswordSection/ErrorMessage';
import ChangePassword from '@/src/components/FindPasswordSection/ChangePassword';
import LeaveAccount from '@/src/components/FindPasswordSection/LeaveAccount';
import BottomButton from '@/src/components/FindPasswordSection/BottomButton';
import {STYLE} from '@/src/constants/styles/style/style';
import {MAGIC_NUMBER} from '@/src/constants/Number/MagicNumber';
import {FindPasswordStyles} from './FindPasswordScreenStyles';
import {useRoute} from '@react-navigation/native';
import {RootStackRouteProp} from '@/src/components/types/NavigationType/NavigationType';
import useFindPassword from '../../hooks/useFindPassword';

const FindPassword = () => {
  const route = useRoute<RootStackRouteProp<'FindPassword'>>();
  const {title} = route?.params;
  const {
    headerTitle,
    name,
    handleNameChange,
    deleteName,
    nameError,
    email,
    handleEmailChange,
    emailError,
    askCode,
    handleRequire,
    isActive,
    timeLeft,
    code,
    handleCodeChange,
    verifiedEmail,
    isCodeVerified,
    resetPasswordInput,
    handleResetPasswordChange,
    deletePassword,
    errorMessage,
    submitResetPassword,
    isLoading,
  } = useFindPassword(title);

  return (
    <SafeAreaView style={FindPasswordStyles.safeContainer}>
      <KeyboardAvoidingView
        style={FindPasswordStyles.container}
        behavior={Platform.OS === STYLE.PLATFORM.IOS ? 'padding' : undefined}
        keyboardVerticalOffset={
          Platform.OS === STYLE.PLATFORM.IOS
            ? MAGIC_NUMBER.SIXTY
            : MAGIC_NUMBER.ZERO
        }>
        <Header Title={headerTitle} />

        <ScrollView
          contentContainerStyle={FindPasswordStyles.formContainer}
          keyboardShouldPersistTaps="handled">
          <NameInput
            name={name}
            handleNameChange={handleNameChange}
            nameError={nameError}
            deleteName={deleteName}
          />
          <EmailInput
            email={email}
            handleEmailChange={handleEmailChange}
            emailError={emailError}
            askCode={askCode}
            isActive={isActive}
            handleRequire={handleRequire}
          />

          {isActive && (
            <VerifyCodeInput
              code={code}
              handleCodeChange={handleCodeChange}
              timeLeft={timeLeft}
              verifiedEmail={verifiedEmail}
            />
          )}

          {errorMessage && !errorMessage.startsWith(FIND_PASSWORD.PASSWORD) && (
            <ErrorMessage errorMessage={errorMessage} />
          )}

          {isCodeVerified && (
            <ChangePassword
              resetPasswordInput={resetPasswordInput}
              handleResetPasswordChange={handleResetPasswordChange}
              deletePassword={deletePassword}
              errorMessage={errorMessage}
            />
          )}

          {headerTitle === FIND_PASSWORD.CHANGE_PASSWORD && <LeaveAccount />}
        </ScrollView>

        <BottomButton submitResetPassword={submitResetPassword} />

        {isLoading && <Loader />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FindPassword;
