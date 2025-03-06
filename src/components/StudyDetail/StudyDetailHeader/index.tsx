import React, {useState} from 'react';

import DashLine from '../../DashLine';

import {StudyDetailHeaderStyles} from './StudyDetailHeaderStyles';
import {StudyDetailHeaderProps} from '@/src/components/types/StudyDetailType/StudyDetailType';
import InviteFriend from '../../InviteFriend';

import {Box} from '@/components/ui/box';

import {Text} from '@/components/ui/text';
import {ICONS} from '@/src/constants/image/icons';
import {Button} from '@/components/ui/button';
import {Image} from '@/components/ui/image';
import {STUDY_DETAIL} from '@/src/constants/StudyDetail/studyDetail';
import {REGULAR_DETAIL_HEADER} from '@/src/constants/StudyGroup/regualrStudy.ts';

const StudyDetailHeader: React.FC<StudyDetailHeaderProps> = ({studyId}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Box style={StudyDetailHeaderStyles.studyHeader}>
        <Box style={StudyDetailHeaderStyles.studyInfo}>
          <Text style={StudyDetailHeaderStyles.studyTitle}>
            {studyDetail.studyName}
          </Text>
          <Text style={StudyDetailHeaderStyles.totalStudyTime}>
            {REGULAR_DETAIL_HEADER.TOTAL_STUDY_TIME}
            <Text style={StudyDetailHeaderStyles.totalStudyTimeValue}>
              {studyDetail.totalStudyTime}
            </Text>
            {REGULAR_DETAIL_HEADER.TIME}
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

      <DashLine />
      <Box style={StudyDetailHeaderStyles.membersHeader}>
        <Text style={StudyDetailHeaderStyles.membersTitle}>
          {REGULAR_DETAIL_HEADER.MEMBER_LIST}
        </Text>
        <Button
          style={StudyDetailHeaderStyles.addMemberButton}
          onPress={() => {
            setShowModal(true);
          }}>
          <Image
            source={ICONS.WHITE_USERS}
            style={StudyDetailHeaderStyles.redStar}
            alt={STUDY_DETAIL.HEADER}
          />
          <Text style={StudyDetailHeaderStyles.addMemberButtonText}>
            {REGULAR_DETAIL_HEADER.ADD_MEMBER}
          </Text>
        </Button>
      </Box>
      {showModal && (
        <InviteFriend isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default StudyDetailHeader;
