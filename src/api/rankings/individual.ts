import apiClient from '@/src/api/axiosInstance';
import {IndividualRanking, GetIndividualRankingResponse} from './types';

/**
 * 개인 랭킹 조회 API
 * GET: /ranks/individual
 */
export const fetchIndividualRanking = async (
  authToken: string,
): Promise<{date: string; ranking: IndividualRanking[]}> => {
  const response = await apiClient.get<GetIndividualRankingResponse>(
    '/ranks/individual',
    {
      headers: {Authorization: authToken},
    },
  );
  if (!response.data.success) {
    throw new Error(
      response.data.error || '개인 랭킹 데이터를 불러오는데 실패했습니다.',
    );
  }
  return response.data.response;
};
