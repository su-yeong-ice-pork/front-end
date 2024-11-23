import {Box} from '@/components/ui/box';
import React from 'react';
import {BadgeStyles} from './BadgeStyles.ts';
import BadgeText from './BadgeText';
import BadgeView from './BadgeView';
import {BadgesProps} from '@/src/api/badge/getBadgesPropsType';

const Badges: React.FC<BadgesProps> = ({badges}) => {
  console.log('BadgeView badges:', badges);
  return (
    <Box style={BadgeStyles.badgeContainer}>
      <BadgeText />
      <BadgeView badges={badges} />
    </Box>
  );
};

export default Badges;
