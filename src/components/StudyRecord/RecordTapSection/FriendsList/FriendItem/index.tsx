import React from 'react';

import {FriendItemStyles} from './FriendItemStyles';

import {TouchableOpacity} from 'react-native';

import {Image} from '@/components/ui/image';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {ICONS} from '@/src/constants/image/icons';

import {FriendsListType} from '@/src/components/types/StudyDetailType/FriendsType/FriendsListType';
import {STUDY_DETAIL} from '@/src/constants/StudyDetail/studyDetail';

const FriendItem: React.FC<FriendsListType> = ({
  profileImage,
  name,
  todayStudyTime,
  studyStatus,
  message,
}) => {
  return (
    <TouchableOpacity
      style={FriendItemStyles.memberItem}
      onPress={() => {
        /* 구성원 터치 기능 */
      }}>
      <Image
        source={profileImage ? {uri: profileImage} : ICONS.BASE_ICON}
        style={FriendItemStyles.memberImage}
        alt={''}
      />
      <Box style={FriendItemStyles.memberInfo}>
        <Text style={FriendItemStyles.memberName}>
          {name}
          <Text style={FriendItemStyles.memberStatus}>
            {studyStatus && STUDY_DETAIL.ON_LINE}
          </Text>
        </Text>
        <Text style={FriendItemStyles.memberStudyTime}>
          오늘 공부 시간:{' '}
          <Text style={FriendItemStyles.totalStudyTimeValue}>
            {todayStudyTime}
          </Text>
        </Text>
        <Box style={FriendItemStyles.messageTextContainer}>
          <Text style={FriendItemStyles.messageText}>{message}</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default FriendItem;
