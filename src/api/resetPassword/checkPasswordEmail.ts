import apiClient from '../axiosInstance';
import {CheckPasswordEmailData, CheckPasswordEmailResponse} from './types';

const checkPasswordEmail = async (
  data: CheckPasswordEmailData,
): Promise<CheckPasswordEmailResponse> => {
  try {
    const response = await apiClient.post<CheckPasswordEmailResponse>(
      '/members/auth',
      data,
    );
    return response.data;
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error('ID 혹은 닉네임이 정확하지 않습니다.');
    }
    throw new Error('에러가 발생했습니다.');
  }
};

export default checkPasswordEmail;
