import React from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Heading} from '@/components/ui/heading';

const GrassTitle = ({name, totalDays}) => {
  return (
    <Box style={{marginTop: 20}}>
      <Text>
        <Heading size="xl">
          <Text size="2xl" style={{color: '#009499'}}>
            {name}
          </Text>
          님은 지금까지{'\n'}
        </Heading>
        <Heading size="xl">
          총{' '}
          <Text size="2xl" style={{color: '#009499'}}>
            {totalDays}
          </Text>
          일의 잔디를 심으셨어요!
        </Heading>
      </Text>
    </Box>
  );
};

export default GrassTitle;
