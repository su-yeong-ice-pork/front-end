import apiClient from '../axiosInstance';
import {CheckNameResponse} from './types';

/**
 * 이름 (닉네임) 중복 체크
 * GET: /members/check/name?name={name}
 */
const checkName = async (name: string): Promise<CheckNameResponse> => {
  try {
    const response = await apiClient.get('/members/check/name', {
      params: {name},
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data as CheckNameResponse;
    } else {
      return {
        success: false,
        response: null,
        error: {
          status: 500,
          message: '네트워크 오류가 발생했습니다.',
        },
      } as CheckNameResponse;
    }
  }
};
export default checkName;
