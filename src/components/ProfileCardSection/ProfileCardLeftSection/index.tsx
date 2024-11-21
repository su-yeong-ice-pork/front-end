import React from 'react';

import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';

import ProfileImage from './ProfileImage';

import {ProfilCardLeftSectionStyles} from './ProfileCardLeftSectionStyles';
import {ProfileCardLeftSectionProps} from '../../types/StudyRecordScreenType/ProfileCardSectionType/ProfileCardType';
import {VStack} from '@/components/ui/vstack';

const ProfileCardLeftSection: React.FC<ProfileCardLeftSectionProps> = ({
  title,
  name,
  profileImage,
  studyMessage,
}) => {
  return (
    <VStack style={ProfilCardLeftSectionStyles.leftSection}>
      <ProfileImage profileImage={profileImage} title={title} name={name} />
      <Box style={ProfilCardLeftSectionStyles.messageBubble}>
        <Text style={ProfilCardLeftSectionStyles.messageText}>
          {studyMessage}
        </Text>
      </Box>
    </VStack>
  );
};

export default ProfileCardLeftSection;
