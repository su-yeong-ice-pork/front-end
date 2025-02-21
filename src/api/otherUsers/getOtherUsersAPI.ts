import apiClient from '../axiosInstance';
import {
  OtherUserDataApiResponseType,
  OtherUserInformationType,
} from './getOtherUsersTypes';

export const getOtherUserDataApi = async (
  authToken: string,
  id: number,
): Promise<{isMyFriend: boolean; member: OtherUserInformationType} | null> => {
  try {
    if (!authToken) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      return null;
    }

    const response = await apiClient.get<OtherUserDataApiResponseType>(
      `/members/${id}`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    if (!response.data.success) {
      console.error('API 에러:', response.data.error);
      return null;
    }

    return response.data.response;
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
