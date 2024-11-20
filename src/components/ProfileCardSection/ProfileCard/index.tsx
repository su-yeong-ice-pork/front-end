import React from 'react';

import {ProfileCardProps} from '../../types/StudyRecordScreenType/ProfileCardSectionType/ProfileCardType';

import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';

import {ProfilCardSectionStyles} from '../ProfilCardSectionStyles';

import StudyButton from '../StudyButton';
import ProfileImage from '../ProfileImage';

const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  name,
  profileImage,
  studyMessage,
  timerValue,
  totalTimeValue,
  isRecording,
  onStudyButtonPress,
}) => {
  return (
    <Box style={ProfilCardSectionStyles.card}>
      <Box style={ProfilCardSectionStyles.leftSection}>
        <ProfileImage profileImage={profileImage} title={title} name={name} />
        <Box style={ProfilCardSectionStyles.messageBubble}>
          <Text style={ProfilCardSectionStyles.messageText}>
            {studyMessage}
          </Text>
        </Box>
      </Box>
      <Box style={ProfilCardSectionStyles.rightSection}>
        <Text style={ProfilCardSectionStyles.timerLabel}>현재 공부 시간</Text>
        <Text style={ProfilCardSectionStyles.timer}>{timerValue}</Text>
        <Text style={ProfilCardSectionStyles.totalTimeLabel}>
          전체 공부 시간
        </Text>
        <Text style={ProfilCardSectionStyles.totalTime}>{totalTimeValue}</Text>
        <StudyButton isRecording={isRecording} onPress={onStudyButtonPress} />
      </Box>
    </Box>
  );
};

export default ProfileCard;
