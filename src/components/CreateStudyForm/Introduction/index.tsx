import React from 'react';
import {Box} from '@/components/ui';
import {Text} from 'react-native';
import {INTRODUCTION} from '@/src/constants/CreateStudy/createStudy.ts';
import {IntroductionStyles} from '@/src/components/CreateStudyForm/Introduction/IntroductionStyles.ts';

const Introduction = ({}) => {
  return (
    <Box style={IntroductionStyles.introductionContainer}>
      <Text style={IntroductionStyles.introduction1}>
        {INTRODUCTION.DESCRIPTION_1}
      </Text>
      <Text style={IntroductionStyles.introduction3}>
        <Text style={IntroductionStyles.introduction2}>
          {INTRODUCTION.DESCRIPTION_2}
        </Text>
        {INTRODUCTION.DESCRIPTION_3}
      </Text>
    </Box>
  );
};

export default Introduction;
