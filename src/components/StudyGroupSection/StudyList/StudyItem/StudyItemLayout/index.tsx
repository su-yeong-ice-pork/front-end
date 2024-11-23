import React from 'react';

import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {SWIPE_VAR} from '@/src/constants/StudyGroup/study';

import {StudyItemLayoutProps} from '@/src/components/types/StudyGroupScreenType/StudyItemProps';
import StudyLeaveButton from '../StudyLeaveButton';

const StudyItemLayout = ({children, name}: StudyItemLayoutProps) => {
  return (
    <Swipeable
      renderLeftActions={(
        /* eslint-disable @typescript-eslint/no-unused-vars */
        progressAnimatedValue,
        dragAnimatedValue,
        swipeable,
      ) => <StudyLeaveButton name={name} />}
      overshootLeft={SWIPE_VAR.OVER_SHOOT_LEFT}
      friction={SWIPE_VAR.FRICTION}>
      {children}
    </Swipeable>
  );
};

export default StudyItemLayout;
