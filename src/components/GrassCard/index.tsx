import React from 'react';
import GrassTitle from './GrassTitle';
import GrassInfoCard from './GrassInfoCard';
import {Box, HStack} from '@/components/ui/index.ts';
import {GrassCardProps} from "@/src/components/types/ProfileType/ProfileType.ts";


const GrassCard: React.FC<GrassCardProps> = ({name, totalDays}) => {
  return (
    <Box>
      <GrassTitle name={name} totalDays={totalDays} />

      <HStack
        style={{
          justifyContent: 'space-around',
        }}>
        <GrassInfoCard type={1} jadiImage="jandi1" />
        <GrassInfoCard type={2} jadiImage="jandi2" />
      </HStack>
    </Box>
  );
};

export default GrassCard;
