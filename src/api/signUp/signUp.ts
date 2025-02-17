import apiClient from '../axiosInstance';
import {SignUpData, SignUpResponse} from './types';

/**
 * 회원가입 최종 제출
 * POST: /members
 * Body: { email, password, name, college, department }
 */
const handleSignup = async (
  SignupData: SignUpData,
): Promise<SignUpResponse> => {
  console.log(SignupData);
  try {
    const response = await apiClient.post<SignUpResponse>(
      '/members',
      SignupData,
    );
    return response.data;
  } catch (error: any) {
    throw new Error('에러가 발생했습니다.');
  }
};

export default handleSignup;
