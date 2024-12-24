import React from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';

import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {GrassCardInfoStyles} from './GrassInfoCardStyles';

import {GRASS_CARD_ALT_MESSAGE} from '@/src/constants/GrassCard/GrassCard.ts';
import {GrassInfoCardProps} from '../../types/GrassCardType/GrassCardType';

const GrassInfoCard: React.FC<GrassInfoCardProps> = ({type}) => {
  return (
    <Box style={GrassCardInfoStyles.grassCardBox}>
      {type === 1 && (
        <Box>
          <Text bold={true} style={GrassCardInfoStyles.grassCardText}>
            2024년 10월 03일에 시작{'\n'}하여 지금까지 총{' '}
            <Text style={GrassCardInfoStyles.grassCardTextPoint}>36</Text>일
          </Text>
          <Image
            style={GrassCardInfoStyles.grassCardImage}
            source={ILLUSTRATIONS.JANDI1}
            alt={GRASS_CARD_ALT_MESSAGE.JANDI}
          />
        </Box>
      )}
      {type === 2 && (
        <Box>
          <Text bold={true} style={GrassCardInfoStyles.grassCardText}>
            지금까지{'\n'}총{' '}
            <Text style={GrassCardInfoStyles.grassCardTextPoint}>139</Text>
            시간의 잔디를
            {'\n'}
            심으셨어요!
          </Text>
          <Image
            style={GrassCardInfoStyles.grassCardImage}
            source={ILLUSTRATIONS.JANDI2}
            alt={GRASS_CARD_ALT_MESSAGE.JANDI}
          />
        </Box>
      )}
    </Box>
  );
};

export default GrassInfoCard;
