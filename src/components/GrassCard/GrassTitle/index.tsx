import React from 'react';
import {Box, Text, Heading} from '@/components/ui/index.ts';

import {GrassTitleStyles} from './GrassTitleStyles';
import {GrassTitleProps} from '../../types/GrassCardType/GrassCardType';
import {GRASS_TITLE} from '@/src/constants/GrassCard/GrassCard.ts';


const GrassTitle = ({name, totalDays}: GrassTitleProps) => {
  return (
    <Box style={GrassTitleStyles.grassTitleBox}>
      <Text>
        <Heading style={GrassTitleStyles.titleText}>
          <Text style={GrassTitleStyles.highlightText}>
            {name}
          </Text>
          {GRASS_TITLE.USER_PROGRESS_MESSAGE}
        </Heading>
        <Heading style={GrassTitleStyles.titleText}>
          {GRASS_TITLE.TOTAL_DAYS}
          <Text style={GrassTitleStyles.highlightText}>
            {totalDays}
          </Text>
          {GRASS_TITLE.PLANTED_DAYS}
        </Heading>
      </Text>
    </Box>
  );
};

export default GrassTitle;
