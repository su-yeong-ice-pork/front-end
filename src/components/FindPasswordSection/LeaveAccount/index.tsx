import React, {useState} from 'react';

import {TouchableOpacity} from 'react-native';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';

import {LeaveAccountStyles} from './LeaveAccountStyles';
import LeaveAccountModal from './LeaveAccountModal/index';

const LeaveAccount = () => {
  const [showLeaveAccount, setShowLeaveAccount] = useState<boolean>(false);
  return (
    <Box>
      <TouchableOpacity
        style={LeaveAccountStyles.textWrapper}
        onPress={() => {
          setShowLeaveAccount(true);
        }}>
        <Text style={LeaveAccountStyles.underlineText}>회원탈퇴</Text>
      </TouchableOpacity>
      <LeaveAccountModal
        showLeaveAccount={showLeaveAccount}
        setShowLeaveAccount={setShowLeaveAccount}
      />
    </Box>
  );
};

export default LeaveAccount;
