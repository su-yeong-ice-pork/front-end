import {useState, useEffect} from 'react';
import {
  NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '../../../constants/regex';
import checkCode from '../../../api/checkCode';
import checkPasswordEmail from '../../../api/checkPasswordEmail';
import resetPassword from '../../../api/resetPassword';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '@/src/components/types/NavigationType/NavigationType';
const useFindPassword = (title: string | undefined) => {
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
  const navigation = useNavigation<RootStackNavigationProp>();

  const headerTitle = title || '비밀번호 찾기';

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

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!EMAIL_REGEX.test(text)) {
      setEmailError('유효한 부산대 이메일을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const handleCodeChange = (text: string) => {
    setCode(text);
  };

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

  const verifiedEmail = async () => {
    setIsLoading(true);
    if (timeLeft <= 0) {
      setErrorMessage('인증 시간이 만료되었습니다. 코드를 재요청해주세요.');
      setIsLoading(false);
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
      setErrorMessage(error.message || '인증 코드가 올바른지 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitResetPassword = async () => {
    if (!PASSWORD_REGEX.test(resetPasswordInput)) {
      setErrorMessage('비밀번호를 다시 설정해주세요!');
      return;
    }
    setIsLoading(true);
    try {
      const response = await resetPassword({
        name: name,
        email: email,
        password: resetPasswordInput,
      });
      if (response.success) {
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

  return {
    headerTitle,
    name,
    setName,
    handleNameChange,
    deleteName,
    nameError,
    email,
    setEmail,
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
  };
};

export default useFindPassword;
