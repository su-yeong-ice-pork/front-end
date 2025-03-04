import React from 'react';
import {Box, HStack, Image, Text, VStack} from '@/components/ui';
import {RandomStudyMemberListStyles} from './RandomStudyMemberListStyles.ts';
import {RandomStudyMemberListProps} from '@/src/components/types/RandomStudyDetailType/RandomStudyDetailType.ts';
import {RANDOM_LIST} from '@/src/constants/StudyGroup/randomStudy.ts';

const RandomStudyMemberList: React.FC<RandomStudyMemberListProps> = ({
  participants,
}) => {
  return (
    <Box style={RandomStudyMemberListStyles.container}>
      {participants.map(member => (
        <Box key={member.memberId} style={RandomStudyMemberListStyles.item}>
          <Image
            source={{uri: member.profileImage}} // API 연결 시 프로필 이미지 링크 사용
            style={RandomStudyMemberListStyles.profileImage}
          />
          <VStack>
            <Text style={RandomStudyMemberListStyles.nameText}>
              {member.name}
            </Text>
            <HStack>
              <Text style={RandomStudyMemberListStyles.titleText}>
                {RANDOM_LIST.TOTAL_TIME}
              </Text>
              <Text style={RandomStudyMemberListStyles.scoreText}>
                {`${member.todayStudyTime}`}
              </Text>
            </HStack>
          </VStack>
        </Box>
      ))}
    </Box>
  );
};

export default RandomStudyMemberList;
