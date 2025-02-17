import apiClient from '../axiosInstance';
import {SendDefaultImgData, SendDefaultImgResponse} from './sendImageType';

const sendDefaultImg = async (
  id: string,
  authToken: string,
  type: string,
  data: SendDefaultImgData,
): Promise<SendDefaultImgResponse> => {
  try {
    const response = await apiClient.patch<SendDefaultImgResponse>(
      `/members/${id}/default-${type}`,
      data,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`에러가 발생했습니다: ${error.message}`);
  }
};

export default sendDefaultImg;
