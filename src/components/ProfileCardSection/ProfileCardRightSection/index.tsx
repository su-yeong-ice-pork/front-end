import React from 'react';

import {Text} from '@/components/ui/text';

import StudyButton from './StudyButton';

import {ProfileCardRightSectionStyles} from './ProfileCardRightSectionStyles';
import {ProfileCardRightSectionProps} from '../../types/StudyRecordScreenType/ProfileCardSectionType/ProfileCardType';
import {VStack} from '@/components/ui/vstack';

const ProfileCardRightSection: React.FC<ProfileCardRightSectionProps> = ({
  timerValue,
  totalTimeValue,
  isRecording,
  onStudyButtonPress,
}) => {
  return (
    <VStack style={ProfileCardRightSectionStyles.rightSection}>
      <Text style={ProfileCardRightSectionStyles.timerLabel}>
        현재 공부 시간
      </Text>
      <Text style={ProfileCardRightSectionStyles.timer}>{timerValue}</Text>
      <Text style={ProfileCardRightSectionStyles.totalTimeLabel}>
        전체 공부 시간
      </Text>
      <Text style={ProfileCardRightSectionStyles.totalTime}>
        {totalTimeValue}
      </Text>
      <StudyButton isRecording={isRecording} onPress={onStudyButtonPress} />
    </VStack>
  );
};

export default ProfileCardRightSection;
