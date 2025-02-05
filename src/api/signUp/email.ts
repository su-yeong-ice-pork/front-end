import {ASKCODE} from '@/src/constants/SignUp/VerifyEmail';
import apiClient from '../axiosInstance';
import {CheckEmailResponse, CheckCodeData, CheckCodeResponse} from './types';

/**
 * 학교 이메일 인증 요청
 * GET: /members/check/email?email={email}
 */
export const requestEmailCode = async (
  email: string,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  setAskCode: React.Dispatch<React.SetStateAction<string>>,
): Promise<CheckEmailResponse> => {
  try {
    const response = await apiClient.get('/members/check/email', {
      params: {email},
    });
    setIsActive(true);
    setAskCode(ASKCODE.RECALL);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data as CheckEmailResponse;
    } else {
      return {
        success: false,
        response: null,
        error: {
          status: 500,
          message: '에러가 발생했습니다.',
        },
      } as CheckEmailResponse;
    }
  }
};

/**
 * 이메일 인증 코드 검증
 * POST: /members/check/code
 * Body: { email, code }
 */
export const verifyEmailCode = async (
  checkCodeData: CheckCodeData,
): Promise<CheckCodeResponse> => {
  console.log(checkCodeData);
  try {
    const response = await apiClient.post<CheckCodeResponse>(
      '/members/check/code',
      checkCodeData,
    );
    return response.data;
  } catch (error: any) {
    throw new Error('에러가 발생했습니다.');
  }
};
