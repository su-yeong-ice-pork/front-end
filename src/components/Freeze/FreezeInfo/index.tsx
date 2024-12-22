import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import FreezeButton from '../FreezeButton';
import FreezeText from '../FreezeText';
import {FreezeInfoStyles} from './freezeInfoStyles';
const FreezeInfo = () => {
  return (
    <Box>
      <Text style={FreezeInfoStyles.frozenTitle}>보유 프리즈</Text>

      <Box style={FreezeInfoStyles.infoCardContainer}>
        <Box style={FreezeInfoStyles.frozenDetailContainer}>
          <Text style={FreezeInfoStyles.frozenDetailText}>
            현재 총 <Text style={FreezeInfoStyles.frozenCount}>0</Text> 개의
            프리즈를 보유하고 있습니다.
          </Text>
        </Box>
        <FreezeButton />
      </Box>
      <FreezeText />
    </Box>
  );
};

export default FreezeInfo;
