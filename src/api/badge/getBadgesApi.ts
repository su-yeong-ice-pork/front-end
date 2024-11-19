import apiClient from '../axiosInstance';
import {BadgeType, getBadgesPropsType} from './getBadgesPropsType';

export const getBadgesApi = async (
  id: number,
  authToken: string,
): Promise<BadgeType[] | null> => {
  try {
    const response = await apiClient.get<getBadgesPropsType>(
      `/members/${id}/badges`,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );
    const badges = response.data.response.badges;
    return badges;
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
