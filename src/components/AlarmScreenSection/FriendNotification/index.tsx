import React from 'react';
import {Box, HStack, VStack} from '@/components/ui';
import {Text} from '@/components/ui';
import {Image} from '@/components/ui/image';
import {Button, ButtonText} from '@/components/ui/button';

import {FriendNotificationStyles} from './FriendNotification';
import {FriendNotificationProps} from '../../types/AlarmScreenType/NotificationData';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {
  FRIEND_ALARM,
  FRIEND_ALARM_ALT,
} from '@/src/constants/Alarm/AlarmComment';
import {ICONS} from '@/src/constants/image/icons';

const FriendNotification: React.FC<FriendNotificationProps> = ({
  memberName,
  isToday,
  time,
  date,
}) => {
  return (
    <Box style={FriendNotificationStyles.container}>
      <HStack>
        <Image
          source={ILLUSTRATIONS.FLOWER_GRASS}
          style={FriendNotificationStyles.image}
          alt={FRIEND_ALARM_ALT.FLOWER}
        />
        <VStack>
          <Text style={FriendNotificationStyles.textContainer}>
            {memberName + FRIEND_ALARM.COMMENT}
          </Text>
          <HStack style={FriendNotificationStyles.buttonContainer}>
            <Button style={FriendNotificationStyles.allowButton}>
              <Image
                source={ICONS.ALLOW_BUTTON}
                style={FriendNotificationStyles.buttonImage}
                alt={FRIEND_ALARM_ALT.ALLOW}
              />
              <ButtonText>{FRIEND_ALARM.ALLOW}</ButtonText>
            </Button>
            <Button style={FriendNotificationStyles.denyButton}>
              <Image
                source={ICONS.DENY_BUTTON}
                style={FriendNotificationStyles.buttonImage}
                alt={FRIEND_ALARM_ALT.DENY}
              />
              <ButtonText>{FRIEND_ALARM.DENY}</ButtonText>
            </Button>
          </HStack>
          {isToday ? (
            <Text style={FriendNotificationStyles.timeText}>{time}</Text>
          ) : (
            <Text style={FriendNotificationStyles.timeText}>{date}</Text>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default FriendNotification;
