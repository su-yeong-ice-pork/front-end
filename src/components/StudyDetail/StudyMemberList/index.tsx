import React from 'react';
import {Box} from '@/components/ui/box';
import {StudyMemberListStyles} from './StudyMemberListStyles';
import StudyMember from './StudyMember';
import {StudyMemberListProps} from '@/src/components/types/StudyDetailType/StudyDetailType';

const StudyMemberList: React.FC<StudyMemberListProps> = ({participants}) => {
  return (
    <Box style={StudyMemberListStyles.membersList}>
      {participants.map((member, index) => (
        <Box key={member.memberId}>
          <StudyMember
            memberId={member.memberId}
            profileImage={member.profileImage}
            isLeader={member.isLeader}
            name={member.name}
            todayStudyTime={member.todayStudyTime}
            studyStatus={member.studyStatus}
          />
          {index !== participants.length - 1 && (
            <Box style={StudyMemberListStyles.separator} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default StudyMemberList;
