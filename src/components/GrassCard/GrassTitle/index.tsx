import React from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Heading} from '@/components/ui/heading';

import {FONT_SIZE} from '@/src/constants/GrassCard/FontSizes';

import {GrassTitleStyles} from './GrassTitleStyles';
import {GrassTitleProps} from '../../types/GrassCardType/GrassCardType';

const GrassTitle = ({name, totalDays}: GrassTitleProps) => {
  return (
    <Box style={GrassTitleStyles.grassTitleBox}>
      <Text>
        <Heading size={FONT_SIZE.XL}>
          <Text size={FONT_SIZE['2XL']} style={GrassTitleStyles.grassTitleText}>
            {name}
          </Text>
          님은 지금까지{'\n'}
        </Heading>
        <Heading size={FONT_SIZE.XL}>
          총{' '}
          <Text size={FONT_SIZE['2XL']} style={GrassTitleStyles.grassTitleText}>
            {totalDays}
          </Text>
          일의 잔디를 심으셨어요!
        </Heading>
      </Text>
    </Box>
  );
};

export default GrassTitle;
