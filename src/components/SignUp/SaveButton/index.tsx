import React from 'react';

import {Button, ButtonText} from '@/components/ui/button';
import {Box} from '@/components/ui/box';
import {LinearGradient, Defs, Stop, Rect} from 'react-native-svg';
import {Svg} from 'react-native-svg';

import {SaveButtonStyles} from './SaveButtonStyles';

import {COLOR} from '@/src/constants/styles/color/color';
import {
  SaveButtonGradient,
  GradientLocation,
} from '@/src/constants/SignUp/SaveButton';

import {useSignUp} from '@/src/hooks/useSignUp';

const SaveButton = () => {
  const {onSignUpPress} = useSignUp();

  return (
    <Box style={SaveButtonStyles.boxContiner}>
      <Svg style={SaveButtonStyles.buttonStyle}>
        <Defs>
          <LinearGradient
            id={SaveButtonGradient.ID}
            x1={SaveButtonGradient.X[0]}
            y1={SaveButtonGradient.Y[0]}
            x2={SaveButtonGradient.X[1]}
            y2={SaveButtonGradient.Y[1]}>
            <Stop
              offset={SaveButtonGradient.OFFSET[0]}
              stopColor={COLOR.GRADIENT.TONE[1]}
            />
            <Stop
              offset={SaveButtonGradient.OFFSET[1]}
              stopColor={COLOR.GRADIENT.TONE[0]}
            />
          </LinearGradient>
        </Defs>
        <Rect
          x={GradientLocation.X}
          y={GradientLocation.Y}
          width={GradientLocation.WIDTH}
          height={GradientLocation.HEIGHT}
          fill={GradientLocation.FILL}
          rx={GradientLocation.RX}
          ry={GradientLocation.RY}
        />
      </Svg>

      <Button onPress={onSignUpPress} style={SaveButtonStyles.button}>
        <ButtonText style={SaveButtonStyles.buttonText}>
          잔디 심으러 가기
        </ButtonText>
      </Button>
    </Box>
  );
};

export default SaveButton;
