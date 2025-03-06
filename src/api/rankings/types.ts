export type IndividualRanking = {
  rank: number;
  memberId: number;
  name: string;
  profileImage: string;
  totalStudyTime: string;
  grassScore: number;
};

export type GetIndividualRankingResponse = {
  success: boolean;
  response: {
    date: string;
    ranking: IndividualRanking[];
  };
  error: string | null;
};

export type GroupRanking = {
  rank: number;
  studyName: string;
  memberCount: number;
  totalStudyTime: string;
};

export type GetGroupRankingResponse = {
  success: boolean;
  response: {
    date: string;
    ranking: GroupRanking[];
  };
  error: string | null;
};
