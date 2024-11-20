import React from 'react';

import {ProfileCardProps} from '../types/StudyRecordScreenType/ProfileCardSectionType/ProfileCardType';

import ProfileImage from './ProfileImage';
import StudyButton from './StudyButton';

import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';

import {ProfilCardSectionStyles} from './ProfilCardSectionStyles';

const ProfileCardSection: React.FC<ProfileCardProps> = ({
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
    <Box style={ProfilCardSectionStyles.profileCardContainer}>
      <Text style={ProfilCardSectionStyles.profileCardTitle}>
        라이벌의 <Text style={ProfilCardSectionStyles.highlightText}>잔디</Text>
        가{'\n'}
        무럭무럭 자라고 있어요!
      </Text>
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
          <Text style={ProfilCardSectionStyles.totalTime}>
            {totalTimeValue}
          </Text>
          <StudyButton isRecording={isRecording} onPress={onStudyButtonPress} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCardSection;
