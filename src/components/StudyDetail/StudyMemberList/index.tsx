import React from 'react';

import {Box} from '@/components/ui/box';

import {StudyMemberListStyles} from './StudyMemberListStyles';
import StudyMember from './StudyMember';

// 멤버 상세 조회 더미 데이터
// GET: /regular-studies/{studyId}/participants
const response = {
  participants: [
    {
      memberId: 1,
      name: '고민석',
      profileImage: null,
      todayStudyTime: 4,
      studyStatus: true,
      isLeader: true,
    },
    {
      memberId: 2,
      name: '유경미',
      profileImage: null,
      todayStudyTime: 4,
      studyStatus: true,
      isLeader: false,
    },
    {
      memberId: 3,
      name: '김진우',
      profileImage: null,
      todayStudyTime: 4,
      studyStatus: false,
      isLeader: false,
    },
    {
      memberId: 4,
      name: '김태영',
      profileImage: null,
      todayStudyTime: 3,
      studyStatus: false,
      isLeader: false,
    },
  ],
};

const StudyMemberList = () => {
  return (
    <>
      <Box style={StudyMemberListStyles.membersList}>
        {response.participants.map((member, index) => (
          <Box key={member.memberId}>
            <StudyMember
              profileImage={member.profileImage}
              isLeader={member.isLeader}
              name={member.name}
              todayStudyTime={member.todayStudyTime}
              studyStatus={member.studyStatus}
            />
            {index !== response.participants.length - 1 && (
              <Box style={StudyMemberListStyles.separator} />
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default StudyMemberList;
