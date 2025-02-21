import {Box} from '@/components/ui/box';
import React from 'react';
import {ProfileBadgeStyles} from './ProfileBadgeStyles.ts';
import {HomeBadgeStyles} from './HomeBadgeStyles.ts';

import BadgeText from './BadgeText';
import BadgeView from './BadgeView';
import {BadgesProps} from '@/src/api/badge/getBadgesPropsType';

const Badges: React.FC<BadgesProps> = ({badges, styleType}) => {
  const badgeContainerStyle =
    styleType === 'home'
      ? HomeBadgeStyles.badgeContainer
      : ProfileBadgeStyles.badgeContainer;

  return (
    <Box style={badgeContainerStyle}>
      <BadgeText styleType={styleType} />
      <BadgeView badges={badges} styleType={styleType} />
    </Box>
  );
};

export default Badges;
