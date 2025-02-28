export type StudyTimeResponse = {
  todayStudyTime: string; // 예: "0:00:01"
  totalStudyTime: string; // 예: "139:06:58"
};

export type AttendanceResponse = {
  attendance: boolean;
};

export type UpdateStudyTimePayload = {
  todayStudyTime: string;
};

export type ApiResponse<T> = {
  success: boolean;
  response: T;
  error: any;
};
