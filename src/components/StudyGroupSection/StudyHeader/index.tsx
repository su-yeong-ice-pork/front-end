import React from 'react';

import {StudyHeaderStyle} from './StudyHeaderStyles';

import {ICONS} from '@/src/constants/image/icons';

import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';
import {PATH_NAME} from '@/src/constants/BottomBar/Images';

const StudyHeader = () => {
  return (
    <Box style={StudyHeaderStyle.headerSection}>
      <Text style={StudyHeaderStyle.title}>
        현재,{'\n'}
        내가 소속된 <Text style={StudyHeaderStyle.highlight}>스터디</Text>
      </Text>
      <Image
        source={ICONS.PENCIL}
        style={StudyHeaderStyle.headerImage}
        alt={PATH_NAME.STUDY}
      />
    </Box>
  );
};

export default StudyHeader;
