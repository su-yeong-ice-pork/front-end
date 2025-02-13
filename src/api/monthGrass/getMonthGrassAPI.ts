import apiClient from '../axiosInstance';
import {GrassType, GrassApiResponse} from './getMonthGrassType';

export const getMonthGrassApi = async (
  id: number,
  year: number,
  month: number,
  authToken: string,
): Promise<GrassType[] | null> => {
  try {
    const response = await apiClient.get<GrassApiResponse>(
      `/members/${id}/grass/monthly?year=${year}&month=${month}`,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );

    const monthGrassData = response.data.response.grass;

    return monthGrassData;
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
