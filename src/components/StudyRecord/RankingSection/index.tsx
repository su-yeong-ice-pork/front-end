import React from 'react';

import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';

import {RankingSectionStyles} from './RankingSectionStyles';

const RankingSection = () => {
  return (
    <Box style={RankingSectionStyles.emptyContainer}>
      <Text style={RankingSectionStyles.emptyText}>
        기록 랭킹은 아직 준비 중입니다.
      </Text>
    </Box>
  );
};

export default RankingSection;
