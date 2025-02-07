export type UserInformationType = {
  id: number;
  name: string;
  profileImage: string | null;
  mainTitle: string;
  freezeCount: number;
  mainBanner?: string;
  friendCount?: number;
  studyCount?: number;
  message?: string;
};

export type UserDataApiResponseType = {
  success: boolean;
  response: {
    member: UserInformationType;
  };
  error: any;
};

export type UsersProps = {
  member: UserInformationType;
  edit?: boolean;
  back?: boolean;
};
