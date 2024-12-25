import React, {useState, useEffect} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Button, ButtonText} from '@/components/ui/button';

import {Modal, TouchableOpacity, Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {collegeData} from '@/src/constants/departData';
import {ICONS} from '@/src/constants/image/icons';
import {
  DepartModal,
  DROPDOWN_COLLEGE,
  DROPDOWN_MAJOR,
} from '@/src/constants/SignUp/RegisterDepart';

import {RegisterDepartStyles} from './RegisterDepartStyles';

const RegisterDepart = () => {
  const [college, setCollege] = useState<string>('');
  const [department, setDepartment] = useState<string>('');

  const [openCollege, setOpenCollege] = useState<boolean>(false);
  const [openDepartment, setOpenDepartment] = useState<boolean>(false);
  const [selectedCollege, setSelectedCollege] = useState<string>(college || '');
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    department || '',
  );

  const [departModalVisible, setDepartModalVisible] = useState<boolean>(false);
  const [departModalMessage, setDepartModalMessage] = useState<string>('');
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
  }, [selectedCollege]);

  const confirmSelection = () => {
    if (selectedCollege && selectedDepartment) {
      setCollege(selectedCollege);
      setDepartment(selectedDepartment);
      setDepartModalVisible(false);
    } else {
      setDepartModalMessage(DepartModal.MESSAGE_SELECT1);
      setDepartModalVisible(true);
    }
  };

  return (
    <Box style={RegisterDepartStyles.inputContainer}>
      <Text style={RegisterDepartStyles.inputLabel}>
        학과 등록 <Text style={RegisterDepartStyles.starmark}>*</Text>
      </Text>
      <TouchableOpacity
        style={RegisterDepartStyles.inputBox}
        onPress={() => setDepartModalVisible(true)}>
        <Text
          style={
            selectedDepartment
              ? RegisterDepartStyles.selectedText
              : RegisterDepartStyles.placeholderText
          }>
          {selectedCollege && selectedDepartment
            ? selectedCollege + ' ' + selectedDepartment
            : DepartModal.MESSAGE_SELECT2}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={departModalVisible}
        transparent={true}
        animationType={DROPDOWN_COLLEGE.ANIMATION}>
        <GestureHandlerRootView style={RegisterDepartStyles.modalOverlay}>
          <Box style={RegisterDepartStyles.modalContainer}>
            <Box style={RegisterDepartStyles.inputWrapper}>
              <Text style={RegisterDepartStyles.modalTitle}>학과 등록</Text>
              <Button
                style={RegisterDepartStyles.resetButton}
                onPress={() => setDepartModalVisible(false)}>
                <Image
                  source={ICONS.CLOSE_BUTTON}
                  style={RegisterDepartStyles.clearIcon}
                />
              </Button>
            </Box>

            <Box style={RegisterDepartStyles.modalContainer2}>
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
                  listMode={DROPDOWN_COLLEGE.LISTMODE}
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  placeholder={DROPDOWN_COLLEGE.PLACEHOLDER}
                  zIndex={1000}
                  zIndexInverse={1000}
                  onOpen={() => setOpenDepartment(false)}
                  style={RegisterDepartStyles.dropDownStyle}
                  dropDownContainerStyle={
                    RegisterDepartStyles.dropDownContainerStyle
                  }
                  tickIconStyle={RegisterDepartStyles.tickIconStyle}
                  labelStyle={RegisterDepartStyles.labelStyle}
                  arrowStyle={RegisterDepartStyles.arrowStyle}
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
                  zIndex={500}
                  zIndexInverse={1000}
                  disabled={!selectedCollege}
                  onOpen={() => setOpenCollege(false)}
                  listMode={DROPDOWN_MAJOR.LISTMODE}
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  style={RegisterDepartStyles.dropDownStyle}
                  dropDownContainerStyle={
                    RegisterDepartStyles.dropDownContainerStyle
                  }
                  tickIconStyle={RegisterDepartStyles.tickIconStyle}
                  labelStyle={RegisterDepartStyles.labelStyle}
                  arrowStyle={RegisterDepartStyles.arrowStyle}
                />
              </Box>
            </Box>

            <Button
              style={RegisterDepartStyles.confirmButton}
              onPress={confirmSelection}>
              <ButtonText style={RegisterDepartStyles.confirmButtonText}>
                확인
              </ButtonText>
            </Button>
          </Box>
        </GestureHandlerRootView>
      </Modal>
    </Box>
  );
};

export default RegisterDepart;
