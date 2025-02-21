import React from 'react';

import {StudyHeaderStyle} from './StudyHeaderStyles';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';
import {PATH_NAME} from '@/src/constants/BottomBar/Images';
import {HeaderProps} from '@/src/components/types/StudyGroupScreenType/StudyHeaderProps.ts';

const StudyHeader: React.FC<HeaderProps> = ({normalText, highlightText, icon}) => {
  return (
    <Box style={StudyHeaderStyle.headerSection}>
      <Text style={StudyHeaderStyle.title}>{normalText}
        <Text style={StudyHeaderStyle.highlight}>{highlightText}</Text>
      </Text>
      <Image
        source={icon}
        style={StudyHeaderStyle.headerImage}
        alt={PATH_NAME.STUDY}
      />
    </Box>
  );
};

export default StudyHeader;
