import React from 'react';
import {
  StudyButtonStyles,
  StudyButtonLinearGradientColor,
  StudyButtonLinearGradientLine,
  StudyButtonTextLine,
  IMAGE_ALT,
} from './StudyButtonStyles';

import {StudyButtonProps} from '@/src/components/types/StudyRecordScreenType/ProfileCardSectionType/StudyButtonType';
import {Button, ButtonIcon, ButtonText} from '@/components/ui/button';
import {Box} from '@/components/ui/box';
import {Image} from 'react-native';
import {LinearGradient} from '@/components/ui/linear-gradient';

const WHITE_NOTE = require('@/assets/images/icons/whiteNote.png');
const CLOCK = require('@/assets/images/icons/Clock.png');

const StudyButton: React.FC<StudyButtonProps> = ({isRecording, onPress}) => {
  return (
    <Button
      onPress={onPress}
      style={[StudyButtonStyles.button, StudyButtonStyles.recordingButton]}>
      {isRecording ? (
        <Box style={StudyButtonStyles.recordingButton}>
          <ButtonIcon>
            <Image
              source={CLOCK}
              style={StudyButtonStyles.icon}
              alt={IMAGE_ALT.RECORD}
            />
          </ButtonIcon>

          <ButtonText
            style={StudyButtonStyles.recordingText}
            numberOfLines={StudyButtonTextLine}
            ellipsizeMode="tail">
            기록 잠시 멈추기
          </ButtonText>
        </Box>
      ) : (
        <LinearGradient
          colors={StudyButtonLinearGradientColor}
          start={StudyButtonLinearGradientLine.start}
          end={StudyButtonLinearGradientLine.end}
          style={StudyButtonStyles.button}>
          <ButtonIcon>
            <Image
              source={WHITE_NOTE}
              style={StudyButtonStyles.icon}
              alt={IMAGE_ALT.START}
            />
          </ButtonIcon>
          <ButtonText
            style={StudyButtonStyles.text}
            numberOfLines={StudyButtonTextLine}
            ellipsizeMode="tail">
            공부 기록 시작하기
          </ButtonText>
        </LinearGradient>
      )}
    </Button>
  );
};

export default StudyButton;
