export type OtherUserInformationType = {
  id: number;
  name: string;
  message: string;
  profileImage: string;
  mainTitle: string;
  mainBanner: string;
};

export type OtherUserDataApiResponseType = {
  success: boolean;
  response: {
    isMyFriend: boolean;
    otherMember: OtherUserInformationType;
  };
  error: any;
};

export type OtherUsersProps = {
  otherMember: OtherUserInformationType;
  edit?: boolean;
  back?: boolean;
};
