export type RecordType = {
  currentStreak: number;
  maxStreak: number;
  totalStudyTime: number;
};

export type RecordApiResponseType = {
  success: boolean;
  response: {
    record: RecordType[];
  };
  error: any;
};

export type Record = RecordType[];
