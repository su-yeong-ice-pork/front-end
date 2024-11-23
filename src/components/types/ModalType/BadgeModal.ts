import {BadgeType} from '@/src/api/badge/getBadgesPropsType';
export type BadgeModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  badges: BadgeType[];
};
