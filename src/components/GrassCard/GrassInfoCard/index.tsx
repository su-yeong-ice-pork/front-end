import React from 'react';
import {Box,Text,Image} from '@/components/ui/index.ts';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {GrassCardInfoStyles} from './GrassInfoCardStyles';
import {
  GRASS_CARD_ALT_MESSAGE,
  GRASS_CARD_TOTAL_DAYS,
  GRASS_CARD_TOTAL_TIME
} from '@/src/constants/GrassCard/GrassCard.ts';
import {GrassInfoCardProps} from '../../types/GrassCardType/GrassCardType';

const GrassInfoCard: React.FC<GrassInfoCardProps> = ({type,highlightNumber,createDate}) => {
  const isType1 = type === 1;

  return (
      <Box style={GrassCardInfoStyles.grassCardBox}>
        <Box>
          <Text style={GrassCardInfoStyles.grassCardText}>
              <Text style={{ fontWeight:800}}>{createDate}</Text>
            {isType1 ? `${GRASS_CARD_TOTAL_DAYS.START}` : GRASS_CARD_TOTAL_TIME.START}{" "}
            <Text style={GrassCardInfoStyles.grassCardTextPoint}>
              {isType1 ? '36' : highlightNumber}
            </Text>
            {isType1 ? GRASS_CARD_TOTAL_DAYS.END : GRASS_CARD_TOTAL_TIME.END}
          </Text>
          <Image
              style={GrassCardInfoStyles.grassCardImage}
              source={isType1 ? ILLUSTRATIONS.JANDI1 : ILLUSTRATIONS.JANDI2}
              alt={GRASS_CARD_ALT_MESSAGE.JANDI}
          />
        </Box>
      </Box>
  );
};

export default GrassInfoCard;
