// changeMessage.ts
import apiClient from './axiosInstance';

export interface changeMessageData {
  message: string;
}

export interface changeMessageResponse {
  success: boolean;
  response: null;
  error: null;
}

const changeMessage = async (
  id: number,
  authToken: string,
  data: changeMessageData,
): Promise<changeMessageResponse> => {
  try {
    const response = await apiClient.patch<changeMessageResponse>(
      `/members/${id}/profile-message`,
      data,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error('에러가 발생했습니다.');
  }
};

export default changeMessage;
