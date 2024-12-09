import React from 'react';

import NotificationItem from '../NotificationItem';

import {NotificationListProps} from '../../types/AlarmScreenType/NotificationData';
import {NotificationListStyles} from './NotificationListStyles';

import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';

const NotificationList: React.FC<NotificationListProps> = ({
  title,
  notifications,
}) => {
  return (
    <Box style={NotificationListStyles.container}>
      <Text style={NotificationListStyles.title}>{title}</Text>
      {notifications.map((notification, index) => (
        <NotificationItem key={index} {...notification} />
      ))}
    </Box>
  );
};

export default NotificationList;
