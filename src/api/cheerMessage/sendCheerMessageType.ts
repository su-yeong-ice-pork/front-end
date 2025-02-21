export type SendCheerMessageRequestType = {
  message: string;
};

export type SendCheerMessageResponseType = {
  success: boolean;
  response: null;
  error: any;
};

export type CheerupWordsProps = {
  friendId: number;
  authToken: string;
};
