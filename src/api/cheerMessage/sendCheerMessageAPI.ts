import apiClient from '../axiosInstance';
import {SendCheerMessageResponseType} from './sendCheerMessageType';

export const sendCheerMessageApi = async (
  friendId: number,
  message: string,
  authToken: string,
): Promise<SendCheerMessageResponseType | null> => {
  try {
    const response = await apiClient.post<SendCheerMessageResponseType>(
      `/friends/${friendId}/message`,
      {message},
      {
        headers: {
          Authorization: authToken,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
