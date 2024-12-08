import React from 'react';

import HostBadge from '../HostBadge';

import {StudyMemberProps} from '@/src/components/types/StudyDetailType/StudyDetailType';
import {StudyMemberStyles} from './StudyMemberStyles';

import {TouchableOpacity} from 'react-native';

import {Image} from '@/components/ui/image';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {ICONS} from '@/src/constants/image/icons';

const StudyMember: React.FC<StudyMemberProps> = ({
  profileImage,
  isLeader,
  name,
  todayStudyTime,
  studyStatus,
}) => {
  return (
    <TouchableOpacity
      style={StudyMemberStyles.memberItem}
      onPress={() => {
        /* 구성원 터치 기능 */
      }}>
      <Image
        source={profileImage ? {uri: profileImage} : ICONS.BASE_ICON}
        style={StudyMemberStyles.memberImage}
        alt={''}
      />
      <Box style={StudyMemberStyles.memberInfo}>
        <Text style={StudyMemberStyles.memberName}>
          {name} {isLeader && <HostBadge />}{' '}
          <Text style={StudyMemberStyles.memberStatus}>
            {studyStatus && '● 공부 중'}
          </Text>
        </Text>
        <Text style={StudyMemberStyles.memberStudyTime}>
          오늘 공부 시간:{' '}
          <Text style={StudyMemberStyles.totalStudyTimeValue}>
            {todayStudyTime}시간
          </Text>
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default StudyMember;
