import React from 'react';

import DashLine from '../../DashLine';

import {StudyDetailHeaderStyles} from './StudyDetailHeaderStyles';
import {StudyDetailHeaderProps} from '@/src/components/types/StudyDetailType/StudyDetailType';

import {Box} from '@/components/ui/box';

import {Text} from '@/components/ui/text';
import {ICONS} from '@/src/constants/image/icons';
import {Button} from '@/components/ui/button';
import {Image} from '@/components/ui/image';
import {STUDY_DETAIL} from '@/src/constants/StudyDetail/studyDetail';

//GET: /regular-studies/{studyId} 더미 데이터
const studyDetail = {
  id: 1,
  studyName: 'CPA 메이트',
  goalMessage: 'IT 개발 목적 동아리 모임',
  goalTime: 145,
  totalStudyTime: 40,
  inviteCode: 'DJKS123',
};

const StudyDetailHeader: React.FC<StudyDetailHeaderProps> = ({studyId}) => {
  return (
    <>
      <Box style={StudyDetailHeaderStyles.studyHeader}>
        <Box style={StudyDetailHeaderStyles.studyInfo}>
          <Text style={StudyDetailHeaderStyles.studyTitle}>
            {studyDetail.studyName}
          </Text>
          <Text style={StudyDetailHeaderStyles.totalStudyTime}>
            총 공부시간:{'  '}
            <Text style={StudyDetailHeaderStyles.totalStudyTimeValue}>
              {studyDetail.totalStudyTime}
            </Text>
            시간
          </Text>
        </Box>
        <Button
          style={StudyDetailHeaderStyles.certifyButton}
          onPress={() => {
            /* 인증하기 기능 */
          }}>
          <Text style={StudyDetailHeaderStyles.certifyButtonText}>
            {studyDetail.goalMessage}
          </Text>
        </Button>
      </Box>

      {/* 점선 */}
      <DashLine />
      <Box style={StudyDetailHeaderStyles.membersHeader}>
        <Text style={StudyDetailHeaderStyles.membersTitle}>구성원 목록</Text>
        <Button
          style={StudyDetailHeaderStyles.addMemberButton}
          onPress={() => {
            /* 구성원 추가 기능 */
          }}>
          <Image
            source={ICONS.WHITE_USERS}
            style={StudyDetailHeaderStyles.redStar}
            alt={STUDY_DETAIL.HEADER}
          />
          <Text style={StudyDetailHeaderStyles.addMemberButtonText}>
            구성원 추가
          </Text>
        </Button>
      </Box>
    </>
  );
};

export default StudyDetailHeader;
