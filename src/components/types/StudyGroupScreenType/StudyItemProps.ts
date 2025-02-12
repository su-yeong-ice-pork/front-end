export type StudyItemProps = {
  id: number;
  name: string;
  totalStudyTime: number;
  memberCount: number;
  onPress?: () => void;
};

export type StudyLeaveButtonProps = {
  name: string;
};

export type StudyItemLayoutProps = {
  children: JSX.Element;
  name: string;
};
