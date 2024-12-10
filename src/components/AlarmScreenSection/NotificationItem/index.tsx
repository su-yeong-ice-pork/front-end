import React from 'react';
import {TouchableOpacity} from 'react-native';
import {NotificationItemProps} from '../../types/AlarmScreenType/NotificationData';
import {AlarmEmoji} from '@/src/constants/Alarm/AlarmEmoji';
import {Image} from '@/components/ui/image';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {NotificationItemStyles} from './NotificationItemStyles';
import {MAGIC_NUMBER} from '@/src/constants/Number/MagicNumber';
import {
  ALARM_TYPE,
  NOTIFICATION_COMMENT,
} from '@/src/constants/Alarm/AlarmComment';

const NotificationItem: React.FC<NotificationItemProps> = ({
  emojiNumber,
  message,
  sender,
  time,
  isToday,
  type,
  date,
  onPress,
}) => {
  const imageSource = AlarmEmoji[emojiNumber + MAGIC_NUMBER.ONE];

  return (
    <TouchableOpacity
      style={NotificationItemStyles.container}
      onPress={onPress}
      activeOpacity={MAGIC_NUMBER.ZERO_POINT_SEVEN}>
      <Image
        source={imageSource.emoji}
        style={NotificationItemStyles.image}
        alt={type}
      />
      <Box style={NotificationItemStyles.textContainer}>
        {type === ALARM_TYPE.EMOJI ? (
          <>
            <Text style={NotificationItemStyles.senderText}>
              {sender + NOTIFICATION_COMMENT.EMOJI}
            </Text>
            <Text style={NotificationItemStyles.contentText}>
              {imageSource.comment}
            </Text>
          </>
        ) : (
          <>
            <Text style={NotificationItemStyles.senderText}>
              {sender + NOTIFICATION_COMMENT.COMMENT}
            </Text>
            <Text style={NotificationItemStyles.contentText}>{message}</Text>
          </>
        )}
        {isToday ? (
          <Text style={NotificationItemStyles.timeText}>{time}</Text>
        ) : (
          <Text style={NotificationItemStyles.timeText}>{date}</Text>
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default NotificationItem;
