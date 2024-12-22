import React from 'react';

import ProfileCardSection from '../../ProfileCardSection';
import {ProfileCardProps} from '../../types/StudyRecordScreenType/ProfileCardSectionType/ProfileCardType';

import DashLine from '../../DashLine';
import FriendsList from './FriendsList';
import FriendsListHeader from './FriendsList/FriendsListHeader';

const RecordTapSection: React.FC<ProfileCardProps> = ({
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
    <>
      <ProfileCardSection
        title={title}
        name={name}
        profileImage={profileImage}
        studyMessage={studyMessage}
        timerValue={timerValue}
        totalTimeValue={totalTimeValue}
        isRecording={isRecording}
        onStudyButtonPress={onStudyButtonPress}
      />
      <DashLine />
      <FriendsListHeader />
      <FriendsList />
    </>
  );
};

export default RecordTapSection;
