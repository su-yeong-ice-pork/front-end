import React from 'react';

import {Box} from '@/components/ui/box';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';

import {ICONS} from '@/src/constants/image/icons';
import {HostBadgeStyles} from './HostBadgeStyles';
import {HOST_BADGE} from "@/src/constants/StudyGroup/regualrStudy.ts";

const HostBadge = () => {
  return (
    <Box style={HostBadgeStyles.hostBadge}>
      <Image source={ICONS.CROWN} style={HostBadgeStyles.crown} alt={''} />
      <Text style={HostBadgeStyles.hostBadgeText}>{HOST_BADGE}</Text>
    </Box>
  );
};

export default HostBadge;
