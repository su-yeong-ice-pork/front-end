import {Text} from '@/components/ui/text';
import React from 'react';
import {HomeBadgeTextStyles} from './HomeBadgeTextStyles.ts';
import {ProfileBadgeTextStyles} from "./ProfileBadgeTextStyles.ts";
import {BadgeTextProps} from "@/src/api/badge/getBadgesPropsType.ts";

const BadgeText:React.FC<BadgeTextProps> = ({styleType}) => {
  const badgeTextStyles = styleType === 'home' ? HomeBadgeTextStyles.badgeText : ProfileBadgeTextStyles.badgeText;

  return <Text style={badgeTextStyles}>보유 뱃지</Text>;
};

export default BadgeText;
