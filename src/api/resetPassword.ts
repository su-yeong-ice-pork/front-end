import axios from 'axios';

const apiClientWithoutAuth = axios.create({
  baseURL:
    'https://grass-server-fua8cyfhabacbgbn.koreasouth-01.azurewebsites.net/api/v1',
});

export interface ResetPasswordData {
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  response: null;
  error: null;
}

const resetPassword = async (
  ResetPasswordData: ResetPasswordData,
): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClientWithoutAuth.patch<ResetPasswordResponse>(
      '/members',
      ResetPasswordData,
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
