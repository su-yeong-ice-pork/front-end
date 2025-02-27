// api 타입으로 변경
export type RandomStudyDetail = {
  id: number;
  studyName: string;
  memberCount: number;
  attendanceTime: string;
  totalStudyTime: number;
};

export type RandomStudyDetailHeaderProps = {
  studyDetail: RandomStudyDetail;
};

// api 타입으로 변경
export type Participant = {
  memberId: number;
  name: string;
  profileImage: string;
  todayStudyTime: string;
};

export type RandomStudyMemberListProps = {
  participants: Participant[];
};
