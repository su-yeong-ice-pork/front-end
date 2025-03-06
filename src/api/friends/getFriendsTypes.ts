export type Friend = {
  id: number;
  name: string;
  message: string;
  profileImage: string;
  todayStudyTime: string;
  studyStatus: boolean;
};

export type FriendsApiResponse = {
  success: boolean;
  response: {
    friends: Friend[];
  };
  error: any;
};

export type UseFriendsResult = {
  friends: Friend[] | null;
  isLoading: boolean;
  error: string | null;
};
