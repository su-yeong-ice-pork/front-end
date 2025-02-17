import apiClient from '../axiosInstance';
import {FriendsApiResponse, Friend} from './getFriendsTypes';

export const getFriendsApi = async (
  authToken: string,
  id: string,
): Promise<Friend[] | null> => {
  try {
    if (!authToken) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      return null;
    }

    const response = await apiClient.get<FriendsApiResponse>(`/friends`, {
      headers: {
        Authorization: authToken,
      },
    });

    if (response.data.success) {
      return response.data.response.friends;
    } else {
      console.error('API 에러:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
