import {Participant, StudyDetail} from '@/src/api/study/types';

export type StudyDetailHeaderProps = {
  studyDetail: StudyDetail;
};

export type StudyMemberProps = {
  memberId: number;
  profileImage: string | null;
  isLeader: boolean;
  todayStudyTime: string;
  name: string;
  studyStatus: boolean;
};

export type StudyMemberListProps = {
  participants: Participant[];
};
