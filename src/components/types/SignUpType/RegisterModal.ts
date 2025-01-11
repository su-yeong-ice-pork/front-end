import {Dispatch, SetStateAction} from 'react';

export type RegisterModalProps = {
  selectedCollege: string;
  setSelectedCollege: Dispatch<SetStateAction<string>>;
  selectedDepartment: string;
  setSelectedDepartment: Dispatch<SetStateAction<string>>;
  departModalVisible: boolean;
  setDepartModalVisible: Dispatch<SetStateAction<boolean>>;
};
