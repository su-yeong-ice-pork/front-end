import React from 'react';

import {Button, ButtonText} from '@/components/ui/button';
import {Box} from '@/components/ui/box';
import {LinearGradient, Defs, Stop, Rect} from 'react-native-svg';
import {Svg} from 'react-native-svg';

import {SaveButtonStyles} from './SaveButtonStyles';

const SaveButton = () => {
  const submitSignUp = () => {};

  return (
    <Box style={SaveButtonStyles.boxContiner}>
      <Svg style={SaveButtonStyles.buttonStyle}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="rgba(31, 209, 245, 1)" />
            <Stop offset="1" stopColor="rgba(0, 255, 150, 1)" />
          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="60"
          fill="url(#gradient)"
          rx="30"
          ry="30"
        />
      </Svg>

      <Button onPress={submitSignUp} style={SaveButtonStyles.button}>
        <ButtonText size="lg" style={SaveButtonStyles.buttonText}>
          잔디 심으러 가기
        </ButtonText>
      </Button>
    </Box>
  );
};

export default SaveButton;
