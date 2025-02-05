import {useState, useEffect} from 'react';
import {useQuery, useMutation} from '@tanstack/react-query';
import {useRecoilState} from 'recoil';
import signUpState from '@/src/recoil/signUpAtom';
import {requestEmailCode, verifyEmailCode} from '@/src/api/signUp/email';
import {CheckEmailResponse, CheckCodeResponse} from '@/src/api/signUp/types';
import {ASKCODE} from '@/src/constants/SignUp/VerifyEmail';

export const useVerifyEmail = () => {
  const [signUp, setSignUp] = useRecoilState(signUpState);

  const [askCode, setAskCode] = useState<string>(ASKCODE.ASK);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(300);

  const [code, setCode] = useState<string>('');

  const {refetch: getEmailCode} = useQuery<CheckEmailResponse>({
    queryKey: ['emailCode', signUp.email],
    queryFn: () => requestEmailCode(signUp.email, setIsActive, setAskCode),
    enabled: false,
  });

  const {mutate: verifyEmail} = useMutation({
    mutationFn: async (code: string) => {
      const response: CheckCodeResponse = await verifyEmailCode({
        email: signUp.email,
        code,
      });
      console.log(response);
      if (response.success) {
        setSignUp({...signUp, emailVerified: true});
      }
      return response;
    },
  });

  const requestEmail = async () => {
    const result = await getEmailCode();
    if (result.data && result.data.success) {
      setTimeLeft(300);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setIsActive(false);
      setAskCode(ASKCODE.ASK);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  return {
    code,
    setCode,
    askCode,
    isActive,
    timeLeft,
    requestEmailCode: requestEmail,
    verifyEmailCode: verifyEmail,
  };
};
