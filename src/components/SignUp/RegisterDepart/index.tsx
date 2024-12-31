import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';

import {TouchableOpacity} from 'react-native';
import {DepartModal} from '@/src/constants/SignUp/RegisterDepart';

import {RegisterDepartStyles} from './RegisterDepartStyles';

import RegisterModal from './RegisterModal';

const RegisterDepart = () => {
  const [college, setCollege] = useState<string>('');
  const [department, setDepartment] = useState<string>('');

  const [departModalVisible, setDepartModalVisible] = useState<boolean>(false);

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
            college && department
              ? RegisterDepartStyles.selectedText
              : RegisterDepartStyles.placeholderText
          }>
          {college && department
            ? `${college} ${department}`
            : DepartModal.MESSAGE_SELECT2}
        </Text>
      </TouchableOpacity>
      {departModalVisible && (
        <RegisterModal
          selectedCollege={college}
          setSelectedCollege={setCollege}
          selectedDepartment={department}
          setSelectedDepartment={setDepartment}
          departModalVisible={departModalVisible}
          setDepartModalVisible={setDepartModalVisible}
        />
      )}
    </Box>
  );
};

export default RegisterDepart;
