import {Study} from '@/src/api/study/types';

export type StudyGroupListProps = {
  studyData: Study | Study[];
  isRandom: boolean;
};
