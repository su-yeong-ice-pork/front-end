import apiClient from './axiosInstance';

type DeleteFriendApiResponse = {
  success: boolean;
  response: null;
  error: any;
};

export const deleteFriendApi = async (
  authToken: string,
  friendId: number,
): Promise<null> => {
  try {
    if (!authToken) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      return null;
    }
    const response = await apiClient.delete<DeleteFriendApiResponse>(
      `/friends/${friendId}`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    if (response.data.success) {
      return response.data.response;
    } else {
      console.error('API 에러:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
