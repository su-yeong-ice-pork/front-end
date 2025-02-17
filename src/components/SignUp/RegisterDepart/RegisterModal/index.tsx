import React, {useState, useEffect} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';
import {Modal} from 'react-native';
import {Button, ButtonText} from '@/components/ui/button';
import DropDownPicker from 'react-native-dropdown-picker';

import {collegeData} from '@/src/constants/departData';
import {ICONS} from '@/src/constants/image/icons';
import {
  DepartModal,
  DROPDOWN_COLLEGE,
  DROPDOWN_MAJOR,
} from '@/src/constants/SignUp/RegisterDepart';

import {RegisterModalStyles} from './RegisterModalStyles';
import {RegisterModalProps} from '@/src/components/types/SignUpType/RegisterModal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {useRecoilState} from 'recoil';
import signUpState from '@/src/recoil/signUpAtom';

const RegisterModal = ({
  selectedCollege,
  setSelectedCollege,
  selectedDepartment,
  setSelectedDepartment,
  departModalVisible,
  setDepartModalVisible,
}: RegisterModalProps) => {
  const [openCollege, setOpenCollege] = useState<boolean>(false);
  const [openDepartment, setOpenDepartment] = useState<boolean>(false);
  const [signUp, setSignUp] = useRecoilState(signUpState);

  const [colleges, setColleges] = useState(
    collegeData.map(item => ({label: item.college, value: item.college})),
  );
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const selected = collegeData.find(c => c.college === selectedCollege);
    if (selected) {
      setDepartments(selected.departments.map(d => ({label: d, value: d})));
    } else {
      setDepartments([]);
    }
    setSelectedDepartment('');
  }, [selectedCollege, setSelectedDepartment]);

  const confirmSelection = () => {
    if (selectedCollege && selectedDepartment) {
      setSignUp({
        ...signUp,
        college: selectedCollege,
        department: selectedDepartment,
      });
      setDepartModalVisible(false);
    } else {
      alert(DepartModal.MESSAGE_SELECT1);
    }
  };

  return (
    <Modal
      visible={departModalVisible}
      transparent={true}
      animationType={DROPDOWN_COLLEGE.ANIMATION}>
      <GestureHandlerRootView style={RegisterModalStyles.modalOverlay}>
        <Box style={RegisterModalStyles.modalContainer}>
          <Box style={RegisterModalStyles.inputWrapper}>
            <Text style={RegisterModalStyles.modalTitle}>학과 등록</Text>
            <Button
              style={RegisterModalStyles.resetButton}
              onPress={() => setDepartModalVisible(false)}>
              <Image
                source={ICONS.CLOSE_BUTTON}
                alt={DepartModal.IMGALT}
                style={RegisterModalStyles.clearIcon}
              />
            </Button>
          </Box>

          <Box style={RegisterModalStyles.modalContainer2}>
            <Box
              style={{
                zIndex: openCollege
                  ? DROPDOWN_COLLEGE.OPEN_Z_INDEX
                  : DROPDOWN_COLLEGE.CLOSE_Z_INDEX,
              }}>
              <DropDownPicker
                open={openCollege}
                value={selectedCollege}
                items={colleges}
                setOpen={setOpenCollege}
                setValue={setSelectedCollege}
                setItems={setColleges}
                placeholder={DROPDOWN_COLLEGE.PLACEHOLDER}
                style={RegisterModalStyles.dropDownStyle}
                dropDownContainerStyle={
                  RegisterModalStyles.dropDownContainerStyle
                }
                onOpen={() => setOpenDepartment(false)}
              />
            </Box>

            <Box
              style={{
                zIndex: openDepartment
                  ? DROPDOWN_MAJOR.OPEN_Z_INDEX
                  : DROPDOWN_MAJOR.CLOSE_Z_INDEX,
              }}>
              <DropDownPicker
                open={openDepartment}
                value={selectedDepartment}
                items={departments}
                setOpen={setOpenDepartment}
                setValue={setSelectedDepartment}
                setItems={setDepartments}
                placeholder={DROPDOWN_MAJOR.PLACEHOLDER}
                style={RegisterModalStyles.dropDownStyle}
                dropDownContainerStyle={
                  RegisterModalStyles.dropDownContainerStyle
                }
                disabled={!selectedCollege}
                onOpen={() => setOpenCollege(false)}
              />
            </Box>
          </Box>

          <Box>
            <Button
              style={RegisterModalStyles.confirmButton}
              onPress={confirmSelection}>
              <ButtonText style={RegisterModalStyles.confirmButtonText}>
                확인
              </ButtonText>
            </Button>
          </Box>
        </Box>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default RegisterModal;
