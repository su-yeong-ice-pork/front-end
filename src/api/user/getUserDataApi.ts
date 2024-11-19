import apiClient from '../axiosInstance';
import {UserDataApiResponseType, UserInformationType} from './getUserDataType';

export const getUserDataApi = async (
  authToken: string,
): Promise<UserInformationType | null> => {
  try {
    if (!authToken) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      return null;
    }

    const response = await apiClient.get<UserDataApiResponseType>('/members', {
      headers: {
        Authorization: `${authToken}`,
      },
    });

    const userData = response.data.response.member;

    return userData;
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
