import React, {useState, useEffect} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Modal, TouchableOpacity, Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {collegeData} from '@/src/constants/departData';
import {ICONS} from '@/src/constants/image/icons';

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
    setSelectedDepartment(''); // 학과 선택 초기화
  }, [selectedCollege]);

  const confirmSelection = () => {
    if (selectedCollege && selectedDepartment) {
      setCollege(selectedCollege);
      setDepartment(selectedDepartment);
      setDepartModalVisible(false);
    } else {
      setDepartModalMessage('단과대학과 학과를 모두 선택해주세요.');
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
            : '대학 소속학과를 등록해주세요'}
        </Text>
      </TouchableOpacity>

      {/* 드롭다운 모달 */}
      <Modal
        visible={departModalVisible}
        transparent={true}
        animationType="slide">
        <GestureHandlerRootView style={RegisterDepartStyles.modalOverlay}>
          <Box style={RegisterDepartStyles.modalContainer}>
            {/* College Selection */}
            <Box style={RegisterDepartStyles.inputWrapper}>
              <Text style={RegisterDepartStyles.modalTitle}>학과 등록</Text>
              <TouchableOpacity
                style={RegisterDepartStyles.resetButton}
                onPress={() => setDepartModalVisible(false)}>
                <Image
                  source={ICONS.CLOSE_BUTTON}
                  style={RegisterDepartStyles.clearIcon}
                />
              </TouchableOpacity>
            </Box>

            <Box style={RegisterDepartStyles.modalContainer2}>
              <Box style={{zIndex: openCollege ? 1000 : 1, flex: 1}}>
                <DropDownPicker
                  open={openCollege}
                  value={selectedCollege}
                  items={colleges}
                  setOpen={setOpenCollege}
                  setValue={setSelectedCollege}
                  setItems={setColleges}
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  placeholder="단과대학"
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

              <Box style={{zIndex: openDepartment ? 1000 : 1, flex: 1}}>
                <DropDownPicker
                  open={openDepartment}
                  value={selectedDepartment}
                  items={departments}
                  setOpen={setOpenDepartment}
                  setValue={setSelectedDepartment}
                  setItems={setDepartments}
                  placeholder="학과"
                  zIndex={500}
                  zIndexInverse={1000}
                  disabled={!selectedCollege}
                  onOpen={() => setOpenCollege(false)}
                  listMode="SCROLLVIEW"
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

            {/* Confirm Button */}
            <TouchableOpacity
              style={RegisterDepartStyles.confirmButton}
              onPress={confirmSelection}>
              <Text style={RegisterDepartStyles.confirmButtonText}>확인</Text>
            </TouchableOpacity>
          </Box>
        </GestureHandlerRootView>
      </Modal>
    </Box>
  );
};

export default RegisterDepart;
