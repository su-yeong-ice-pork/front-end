export type FriendsListType = {
  id: number;
  name: string;
  message: string;
  profileImage: string | null;
  todayStudyTime: string;
  studyStatus: boolean;
};

export type AddFriendProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type FriendSearchProps = {
  friendData: {
    id: number;
    profileImage: string | null;
    name: string;
  };
};
