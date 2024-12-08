export type StudyDetailHeaderProps = {
  studyId: number;
};

export type StudyMemberProps = {
  profileImage: string | null;
  isLeader: boolean;
  todayStudyTime: number;
  name: string;
  studyStatus: boolean;
};
