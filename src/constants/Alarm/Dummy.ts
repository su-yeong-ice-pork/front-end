import {NotificationData} from '@/src/components/types/AlarmScreenType/NotificationData';

export const DummyNotification: NotificationData[] = [
  {
    id: 1,
    sender: '김진우',
    emojiNumber: 0,
    type: 'emoji',
    message: null,
    isToday: true,
    time: '오늘 오전 10:03',
    date: '10월 24일',
  },
  {
    id: 2,
    sender: '김진우',
    emojiNumber: -1,
    type: 'message',
    message: '123123213',
    isToday: false,
    time: '오후 10:03',
    date: '6월 24일',
  },
  {
    id: 3,
    sender: '김진우',
    emojiNumber: 2,
    type: 'emoji',
    message: null,
    isToday: false,
    time: '오후 10:03',
    date: '4월 24일',
  },
];
