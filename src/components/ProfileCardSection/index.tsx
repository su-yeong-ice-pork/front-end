import React from 'react';

import {ProfileCardProps} from '../types/StudyRecordScreenType/ProfileCardSectionType/ProfileCardType';

import {Box} from '@/components/ui/box';
import {HStack} from '@/components/ui/hstack';

import {ProfilCardSectionStyles} from './ProfilCardSectionStyles';

import ProfileCardTitle from './ProfileCardTitle';
import ProfileCardLeftSection from './ProfileCardLeftSection';
import ProfileCardRightSection from './ProfileCardRightSection';

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
      <ProfileCardTitle />
      <HStack style={ProfilCardSectionStyles.card}>
        <ProfileCardLeftSection
          title={title}
          name={name}
          profileImage={profileImage}
          studyMessage={studyMessage}
        />
        <ProfileCardRightSection
          timerValue={timerValue}
          totalTimeValue={totalTimeValue}
          isRecording={isRecording}
          onStudyButtonPress={onStudyButtonPress}
        />
      </HStack>
    </Box>
  );
};

export default ProfileCardSection;
