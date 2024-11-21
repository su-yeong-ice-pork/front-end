import React from 'react';

import {Text} from '@/components/ui/text';

import {ProfileCardTitleStyles} from './ProfileCardTitleStyles';

const ProfileCardTitle = ({}) => {
  return (
    <Text style={ProfileCardTitleStyles.profileCardTitle}>
      라이벌의 <Text style={ProfileCardTitleStyles.highlightText}>잔디</Text>가
      {'\n'}
      무럭무럭 자라고 있어요!
    </Text>
  );
};
export default ProfileCardTitle;
