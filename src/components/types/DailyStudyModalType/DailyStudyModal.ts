export type DailyStudyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type SelectDateProps = {
  setAttendanceDate: React.Dispatch<React.SetStateAction<string>>;
  setAttendanceTime: React.Dispatch<React.SetStateAction<string>>;
};
