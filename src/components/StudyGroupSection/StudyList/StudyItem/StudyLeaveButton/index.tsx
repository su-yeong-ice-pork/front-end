import React from 'react';

import {ICONS} from '@/src/constants/image/icons';
import {StudyLeaveButtonProps} from '@/src/components/types/StudyGroupScreenType/StudyItemProps';
import {StudyLeaveButtonStyles} from './StudyLeaveButtonStyle';
import {Button} from '@/components/ui/button';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';

const StudyLeaveButton = ({name}: StudyLeaveButtonProps) => {
  const onLeaveStudy = () => {
    // 스터디에서 나가기 로직을 여기에 추가 (추후 axios 연결 예정)
  };
  return (
    <Button style={StudyLeaveButtonStyles.leftAction} onPress={onLeaveStudy}>
      <Image
        source={ICONS.TRASH}
        style={StudyLeaveButtonStyles.actionIcon}
        alt={name}
      />
      <Text style={StudyLeaveButtonStyles.actionText}>스터디에서 나가기</Text>
    </Button>
  );
};

export default StudyLeaveButton;
