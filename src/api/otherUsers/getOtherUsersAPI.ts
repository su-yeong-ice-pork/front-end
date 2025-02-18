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
      console.error('��ū�� �����ϴ�. �α����� �ʿ��մϴ�.');
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
      console.error('API ����:', response.data.error);
      return null;
    }

    return response.data.response;
  } catch (error) {
    console.error('��Ʈ��ũ ����:', error);
    return null;
  }
};
