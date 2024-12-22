export type StudyGroupData = {
  name: string;
  totalStudyTime: number;
  memberCount: number;
};

export type StudyGroupListProps = {
  studyData: StudyGroupData[];
};
