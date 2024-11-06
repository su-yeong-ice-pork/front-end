import apiClient from './axiosInstance';

export interface passwordData {
  name: string;
  email: string;
  password: string;
}

export interface passwordResponse {
  success: boolean;
  response: null;
  error: null;
}

const changePassword = async (
  passwordData: passwordData,
): Promise<passwordResponse> => {
  try {
    const response = await apiClient.patch<passwordResponse>(
      '/members',
      passwordData,
    );
    return response.data;
  } catch (error: any) {
    throw new Error('에러가 발생했습니다.');
  }
};

export default changePassword;
