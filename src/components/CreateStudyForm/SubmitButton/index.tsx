import React from 'react';
import {Box, VStack} from '@/components/ui';
import {Image, Text} from 'react-native';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations.ts';
import {LinearGradient} from '@/components/ui/linear-gradient';
import {COLOR} from '@/src/constants/styles/color/color.ts';
import {Pressable} from '@/components/ui/pressable';
import {TITLE} from '@/src/constants/CreateStudy/createStudy.ts';
import {Button} from '@/components/ui/button';
import {SubmitButtonProps} from '@/src/components/types/CreateScreenType/SubmitButtonType.ts';
import {SubmitButtonStyles} from '@/src/components/CreateStudyForm/SubmitButton/SubmitButtonStyles.ts';

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isFormValid,
  handleSubmit,
}) => {
  return (
    <VStack style={SubmitButtonStyles.buttonContainer}>
      <Image
        source={ILLUSTRATIONS.CREATE_STUDY}
        style={SubmitButtonStyles.illustration}
      />
      <Box>
        {isFormValid ? (
          <LinearGradient
            colors={COLOR.GRADIENT.TONE}
            start={COLOR.GRADIENT_2.START}
            end={COLOR.GRADIENT_2.END}
            style={SubmitButtonStyles.button}>
            <Pressable onPress={handleSubmit}>
              <Text style={SubmitButtonStyles.buttonText}>{TITLE}</Text>
            </Pressable>
          </LinearGradient>
        ) : (
          <Button
            style={SubmitButtonStyles.button}
            onPress={handleSubmit}
            disabled={!isFormValid}>
            <Text style={SubmitButtonStyles.buttonText}>{TITLE}</Text>
          </Button>
        )}
      </Box>
    </VStack>
  );
};

export default SubmitButton;
