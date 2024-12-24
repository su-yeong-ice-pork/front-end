import React from 'react';
import {Box, Text, Heading} from '@/components/ui/index.ts';

import {FONT_SIZE} from '@/src/constants/GrassCard/FontSizes';
import {GrassTitleStyles} from './GrassTitleStyles';
import {GrassTitleProps} from '../../types/GrassCardType/GrassCardType';
import {GRASS_TITLE} from '@/src/constants/GrassCard/GrassCard.ts';


const GrassTitle = ({name, totalDays}: GrassTitleProps) => {
  return (
    <Box style={GrassTitleStyles.grassTitleBox}>
      <Text>
        <Heading size={FONT_SIZE.XL}>
          <Text size={FONT_SIZE['2XL']} style={GrassTitleStyles.grassTitleText}>
            {name}
          </Text>
          {GRASS_TITLE.USER_PROGRESS_MESSAGE}
        </Heading>
        <Heading size={FONT_SIZE.XL}>
          {GRASS_TITLE.TOTAL_DAYS}
          <Text size={FONT_SIZE['2XL']} style={GrassTitleStyles.grassTitleText}>
            {totalDays}
          </Text>
          {GRASS_TITLE.PLANTED_DAYS}
        </Heading>
      </Text>
    </Box>
  );
};

export default GrassTitle;
