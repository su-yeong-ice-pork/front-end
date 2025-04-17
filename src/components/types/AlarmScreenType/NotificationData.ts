import FriendNotification from '../../AlarmScreenSection/FriendNotification';

export interface NotificationData {
  id: number;
  sender: string;
  emojiNumber: number;
  type: 'emoji' | 'message';
  message: string | null;
  isToday: boolean;
  time: string;
  date: string;
}

export interface FriendNotificationData {
  id: number;
  memberName: string;
  isToday: boolean;
  time: string;
  date: string;
}

export interface NotificationItemProps extends NotificationData {
  onPress?: () => void;
}

export type NotificationListProps = {
  title: string;
  notifications: NotificationData[];
  friendRequests: FriendNotificationData[];
};

export interface FriendNotificationProps extends FriendNotificationData {}
