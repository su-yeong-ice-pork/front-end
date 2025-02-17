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
    throw new Error(`������ �߻��߽��ϴ�: ${error.message}`);
  }
};

export default sendDefaultImg;
