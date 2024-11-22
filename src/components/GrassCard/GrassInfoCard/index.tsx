import React from 'react';
import {Dimensions} from 'react-native';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';

import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {GrassCardInfoStyles} from './GrassInfoCardStyles';

type GrassInfoCardProps = {
  type: 1 | 2;
};

const GrassInfoCard: React.FC<GrassInfoCardProps> = ({type}) => {
  return (
    <Box style={GrassCardInfoStyles.grassCardBox}>
      {type === 1 && (
        <Box>
          <Text bold={true} style={GrassCardInfoStyles.grassCardText}>
            2024년 10월 03일에 시작{'\n'}하여 지금까지 총{' '}
            <Text style={{fontSize: 15, color: '#009499'}}>36</Text>일
          </Text>
          <Image
            style={GrassCardInfoStyles.grassCardImage}
            source={ILLUSTRATIONS.JANDI1}
            alt="jandi"
          />
        </Box>
      )}
      {type === 2 && (
        <Box>
          <Text bold={true} style={GrassCardInfoStyles.grassCardText}>
            지금까지{'\n'}총{' '}
            <Text style={{fontSize: 15, color: '#009499'}}>139</Text>시간의
            잔디를
            {'\n'}
            심으셨어요!
          </Text>
          <Image
            style={GrassCardInfoStyles.grassCardImage}
            source={ILLUSTRATIONS.JANDI2}
            alt="jandi"
          />
        </Box>
      )}
    </Box>
  );
};

export default GrassInfoCard;
