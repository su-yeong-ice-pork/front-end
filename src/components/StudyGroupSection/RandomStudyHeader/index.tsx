import React from 'react';

import {RandomStudyHeaderStyle} from './RandomStudyHeaderStyles';
import {ICONS} from '@/src/constants/image/icons';

import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';
import {PATH_NAME} from '@/src/constants/BottomBar/Images';

const RandomeStudyHeader = () => {
  return (
    <Box style={RandomStudyHeaderStyle.headerSection}>
      <Text style={RandomStudyHeaderStyle.title}>
        오늘의 랜덤 매칭{' '}
        <Text style={RandomStudyHeaderStyle.highlight}>스터디</Text>
      </Text>
      <Image
        source={ICONS.NOTE_ON}
        style={RandomStudyHeaderStyle.headerImage}
        alt={PATH_NAME.STUDY}
      />
    </Box>
  );
};

export default RandomeStudyHeader;
