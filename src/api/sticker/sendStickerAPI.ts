import apiClient from '../axiosInstance';
import {
  SetFriendEmojiApiResponse,
  SetFriendEmojiRequestBody,
} from './sendStickerTypes';

export const setFriendEmojiApi = async (
  authToken: string,
  id: number,
  emojiNumber: number,
): Promise<{success: boolean; error?: any}> => {
  try {
    if (!authToken) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      return {success: false, error: 'No auth token'};
    }

    const body: SetFriendEmojiRequestBody = {emojiNumber};
    const response = await apiClient.post<SetFriendEmojiApiResponse>(
      `/friends/${id}/emoji`,
      body,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );
    console.log('API 응답:', response.data.response);
    if (response.data.success) {
      return {success: true};
    } else {
      console.error('API 에러:', response.data.error);
      return {success: false, error: response.data.error};
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    return {success: false, error};
  }
};
