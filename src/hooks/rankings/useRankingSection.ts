import {useState, useMemo} from 'react';
import {
  RankingData,
  UseRankingSectionFormReturn,
} from '@/src/components/types/RankingType/RankingSectionType';

export const useRankingSectionForm = (
  individualData?: RankingData,
  groupData?: RankingData,
): UseRankingSectionFormReturn => {
  const [rankingType, setRankingType] = useState<'individual' | 'group'>(
    'individual',
  );

  const toggleRanking = () => {
    setRankingType(prev => (prev === 'individual' ? 'group' : 'individual'));
  };

  const date =
    rankingType === 'individual' ? individualData?.date : groupData?.date;

  const {month, day} = useMemo(() => {
    if (date) {
      const [m, d] = date.split(/월|일/).filter(Boolean);
      return {month: m, day: d};
    }
    return {month: '', day: ''};
  }, [date]);

  return {rankingType, toggleRanking, month, day};
};
