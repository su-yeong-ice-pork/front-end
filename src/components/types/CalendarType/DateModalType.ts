export type DateModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedDateData?: {
    studyTime: number;
    grassScore: number;
  };
};
