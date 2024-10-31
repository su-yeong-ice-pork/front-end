import apiClient from './axiosInstance';

export interface GrassResponse {
  success: boolean;
  response: string;
  error: any;
}

export const postGrass = async (
  token: string,
): Promise<{
  success: boolean;
  data?: GrassResponse;
  error?: any;
  headers?: any;
}> => {
  try {
    const response = await apiClient.post<GrassResponse>(
      '/grass',
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return {
      success: true,
      data: response.data,
      headers: response.headers,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};
