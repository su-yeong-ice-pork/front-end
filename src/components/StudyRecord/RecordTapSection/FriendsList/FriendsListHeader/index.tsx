import React from 'react';

import {TouchableOpacity} from 'react-native';
import {FriendsListHeaderStyles} from './FriendsListHeaderStyles';

import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';

import {ICONS} from '@/src/constants/image/icons';
import {STUDY_DETAIL} from '@/src/constants/StudyDetail/studyDetail';

const FriendsListHeader = () => {
  return (
    <Box style={FriendsListHeaderStyles.membersHeader}>
      <Text style={FriendsListHeaderStyles.membersTitle}>친구 목록</Text>
      <TouchableOpacity
        style={FriendsListHeaderStyles.addMemberButton}
        onPress={() => {}}>
        <Image
          source={ICONS.WHITE_USERS}
          style={FriendsListHeaderStyles.redStar}
          alt={STUDY_DETAIL.HEADER}
        />
        <Text style={FriendsListHeaderStyles.addMemberButtonText}>
          친구 추가
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

export default FriendsListHeader;
