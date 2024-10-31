import apiClient from './axiosInstance';
import {getItem} from './asyncStorage';

export interface Badge {
  id: number;
  fileName: string;
  name: string;
  description: string;
}

interface BadgeApiResponse {
  success: boolean;
  response: {
    badgeCount: number;
    badges: Badge[];
  } | null;
  error: any;
}

export const getBadges = async (
  id: number,
  authToken: string,
): Promise<Badge[] | null> => {
  try {
    const response = await apiClient.get<BadgeApiResponse>(
      `/members/${id}/badges`,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );

    if (response.data.success && response.data.response) {
      return response.data.response.badges;
    } else {
      console.error('API 에러:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
