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
      console.error('��ū�� �����ϴ�. �α����� �ʿ��մϴ�.');
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
      console.error('API ����:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('��Ʈ��ũ ����:', error);
    return null;
  }
};
