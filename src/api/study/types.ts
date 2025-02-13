export type Study = {
  id: number;
  studyName: string;
  memberCount: number;
  totalStudyTime: number;
};

export type GetRegularStudiesResponse = {
  success: boolean;
  response: {
    regularStudies: Study[];
  };
  error: null | string;
};

export type StudyDetail = {
  id: number;
  studyName: string;
  goalMessage: string;
  goalTime: number;
  totalStudyTime: number;
  inviteCode: string;
};

export type GetStudyDetailResponse = {
  success: boolean;
  response: StudyDetail;
  error: string | null;
};

export type Participant = {
  memberId: number;
  name: string;
  profileImage: string;
  todayStudyTime: string;
  studyStatus: boolean;
  isLeader: boolean;
};

export type GetStudyParticipantsResponse = {
  success: boolean;
  response: {
    participants: Participant[];
  };
  error: string | null;
};

export type CreateStudyRequest = {
  name: string;
  goalMessage: string;
  goalTime: number;
};

export type CreateStudyResponse = {
  success: boolean;
  response: {
    inviteCode: string;
  };
  error: string | null;
};
