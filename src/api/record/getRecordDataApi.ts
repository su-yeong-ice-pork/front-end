import apiClient from '../axiosInstance';
import {RecordType, RecordApiResponseType} from './getRecordDataType';

export const getRecordDataApi = async (
  id: number,
  authToken: string,
): Promise<RecordType[] | null> => {
  try {
    const response = await apiClient.get<RecordApiResponseType>(
      `/members/${id}/record`,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );

    const recordData = response.data.response;
    return recordData;
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
