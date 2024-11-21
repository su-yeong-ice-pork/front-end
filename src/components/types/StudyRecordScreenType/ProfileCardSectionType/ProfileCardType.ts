export type ProfileCardProps = {
  title: string;
  name: string;
  studyMessage: string;
  profileImage: string;
  timerValue: string;
  totalTimeValue: string;
  isRecording: boolean;
  onStudyButtonPress: () => void;
};

export type ProfileCardLeftSectionProps = {
  title: string;
  name: string;
  studyMessage: string;
  profileImage: string;
};

export type ProfileCardRightSectionProps = {
  timerValue: string;
  totalTimeValue: string;
  isRecording: boolean;
  onStudyButtonPress: () => void;
};
