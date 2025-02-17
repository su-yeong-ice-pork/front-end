import apiClient from '../axiosInstance';
import {ResetPasswordData, ResetPasswordResponse} from './types';

/**
 * 비밀번호 변경
 * PATCH: /members
 * Body: { name, email, password }
 */
const resetPassword = async (
  resetPasswordData: ResetPasswordData,
): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.patch<ResetPasswordResponse>(
      '/members',
      resetPasswordData,
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error?.message || '에러가 발생했습니다.';
    console.log('에러가 발생했습니다:', errorMessage);
    throw new Error(errorMessage);
  }
};

export default resetPassword;
