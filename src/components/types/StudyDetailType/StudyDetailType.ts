import {StudyDetail} from '@/src/api/study/types';

export type StudyDetailHeaderProps = {
  studyDetail: StudyDetail;
};

export type StudyMemberProps = {
  memberId: number;
  profileImage: string | null;
  isLeader: boolean;
  todayStudyTime: number;
  name: string;
  studyStatus: boolean;
};

export type StudyMemberListProps = {
  participants: StudyMemberProps[];
};
