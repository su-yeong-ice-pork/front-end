import React from 'react';

import {StudyGroupListProps} from '../types/StudyGroupScreenType/StudyGroupDataType';
import {StudyGroupSectionStyles} from './StudyGroupSectionStyles';

import StudyList from './StudyList/index';
import StudyHeader from './StudyHeader/index';
import {Box} from '@/components/ui/box';
import {REGUALR_TITLE} from '@/src/constants/StudyGroup/regualrStudy.ts';
import {RANDOM_TITLE} from '@/src/constants/StudyGroup/randomStudy.ts';

const StudyGroupSection: React.FC<StudyGroupListProps> = ({
  studyData,
  isRandom,
}) => {
  const TITLE = isRandom ? RANDOM_TITLE : REGUALR_TITLE;

  return (
    <Box style={StudyGroupSectionStyles.container}>
      <StudyHeader
        normalText={TITLE.NORMAL_TEXT}
        highlightText={TITLE.HIGHLIGHT_TEXT}
        icon={TITLE.ICON}
      />
      <StudyList studyData={studyData} isRandom={isRandom} />
    </Box>
  );
};

export default StudyGroupSection;
