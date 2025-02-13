import apiClient from '@/src/api/axiosInstance';
import {GroupRanking, GetGroupRankingResponse} from './types';

/**
 * 그룹 랭킹 조회 API
 * GET: /ranks/studies
 */
export const fetchGroupRanking = async (
  authToken: string,
): Promise<{date: string; ranking: GroupRanking[]}> => {
  const response = await apiClient.get<GetGroupRankingResponse>(
    '/ranks/studies',
    {
      headers: {Authorization: authToken},
    },
  );
  if (!response.data.success) {
    throw new Error(
      response.data.error || '그룹 랭킹 데이터를 불러오는데 실패했습니다.',
    );
  }
  return response.data.response;
};
