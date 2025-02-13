import apiClient from '../axiosInstance';
import {GrassType, GrassApiResponse} from './getYearGrassType';

export const getYearGrassApi = async (
  id: number,
  year: number,
  authToken: string,
): Promise<GrassType[] | null> => {
  try {
    const response = await apiClient.get<GrassApiResponse>(
      `/members/${id}/grass/yearly?year=${year}`,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );

    const yearGrassData = response.data.response.grass;
    return yearGrassData;
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
