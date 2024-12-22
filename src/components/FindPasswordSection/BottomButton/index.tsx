import React from 'react';

import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {BottomButtonProps} from '../../types/FindPasswordType/ButtonType';
import {BottomButtonStyles} from './BottomButtonStyles';

import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';
import {COLOR} from '@/src/constants/styles/color/color';

const BottomButton: React.FC<BottomButtonProps> = ({submitResetPassword}) => {
  return (
    <Box style={BottomButtonStyles.buttonContainer}>
      <TouchableOpacity
        style={BottomButtonStyles.signUpButton}
        onPress={submitResetPassword}>
        <LinearGradient
          colors={COLOR.GRADIENT.TONE}
          style={BottomButtonStyles.signUpButtonGradient}
          start={COLOR.GRADIENT.START}
          end={COLOR.GRADIENT.END}>
          <Text style={BottomButtonStyles.signUpButtonText}>
            다시 잔디 심으러 가기
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Box>
  );
};

export default BottomButton;
