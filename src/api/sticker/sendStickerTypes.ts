export type SetFriendEmojiApiResponse = {
  success: boolean;
  response: null;
  error: any;
};

export type SetFriendEmojiRequestBody = {
  emojiNumber: number;
};

export type SetFriendEmojiInput = {
  id: number;
  emojiNumber: number;
};
