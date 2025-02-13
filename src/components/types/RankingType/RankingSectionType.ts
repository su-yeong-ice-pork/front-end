export type RankingData = {
  date: string;
};

export type UseRankingSectionFormReturn = {
  rankingType: 'individual' | 'group';
  toggleRanking: () => void;
  month: string;
  day: string;
};

export type IndividualRanking = {
  rank: number;
  memberId: number;
  name: string;
  profileImage: string | null;
  totalStudyTime: string;
  grassScore: number;
};

export type GroupRanking = {
  rank: number;
  studyName: string;
  memberCount: number;
  totalStudyTime: string;
};

export type IndividualRankingData = {
  date: string;
  ranking: IndividualRanking[];
};
export type GroupRankingData = {
  date: string;
  ranking: GroupRanking[];
};

export type IndividualRankingListProps = {
  rankingData: IndividualRanking[];
};

export type GroupRankingListProps = {
  rankingData: GroupRanking[];
};
