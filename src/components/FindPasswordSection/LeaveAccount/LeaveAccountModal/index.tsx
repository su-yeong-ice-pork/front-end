import React, {useState} from 'react';

import {Modal, TextInput, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '@/src/components/types/NavigationType/NavigationType';

import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import {setItem} from '@/src/api/asyncStorage';
import {CancelAccount} from '@/src/api/user/deleteUserDataApi/leaveAccount';
import {LeaveAccountModalProps} from '@/src/components/types/FindPasswordType/LeaveAccounType';
import {LeaveAccountModalStyles} from './LeaveAccountModalStyles';

import {Box} from '@/components/ui/box';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {FIND_PASSWORD} from '@/src/constants/FindPassword/FindPassword';
import {ICONS} from '@/src/constants/image/icons';

const LeaveAccountModal: React.FC<LeaveAccountModalProps> = ({
  showLeaveAccount,
  setShowLeaveAccount,
}) => {
  const authInfo = useRecoilValue(authState);
  const authToken = authInfo?.authToken;
  const [currentPassword, setCurrentPassword] = useState('');

  const navigation = useNavigation<RootStackNavigationProp>();
  const handleLeaveAccount = async () => {
    if (!authToken) {
      console.error('인증 토큰이 없습니다. 탈퇴 요청을 진행할 수 없습니다.');
      return;
    }
    try {
      const response = await CancelAccount(authToken, currentPassword);
      if (response && response.success) {
        await setItem('refreshToken', '');
        await setItem('autoLogin', '');
        setShowLeaveAccount(false);
        navigation.navigate('Landing');
      } else {
        console.error('탈퇴 요청 실패:', response?.error);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showLeaveAccount}
      onRequestClose={() => setShowLeaveAccount(false)}>
      <Box style={LeaveAccountModalStyles.logoutModalOverlay}>
        <Box style={LeaveAccountModalStyles.logoutModalView}>
          <Box style={LeaveAccountModalStyles.logoutModalHeader}>
            <Box style={LeaveAccountModalStyles.logoutModalTextWrapper}>
              <Text style={LeaveAccountModalStyles.logoutModalText}>
                정말 탈퇴하실 건가요?
              </Text>
            </Box>
            <TouchableOpacity
              onPress={() => setShowLeaveAccount(false)}
              style={LeaveAccountModalStyles.logoutModalCloseButton}>
              <Image
                source={ICONS.CLOSE_LOGOUT}
                style={LeaveAccountModalStyles.logoutModalCloseIcon}
                alt={FIND_PASSWORD.PLACE_HOLDER.INPUT_PASSWORD}
              />
            </TouchableOpacity>
          </Box>
          <Box style={LeaveAccountModalStyles.logoutModalContent}>
            <Text style={LeaveAccountModalStyles.logoutModalDescription}>
              이렇게 가면 슬퍼요...{'\n'}
              탈퇴 버튼 누를 시 바로 회원님 모든 정보가 삭제됩니다. {'\n'}
              다시는 되돌릴 수 없습니다.
            </Text>
            <TextInput
              style={LeaveAccountModalStyles.passwordInput}
              placeholder={FIND_PASSWORD.PLACE_HOLDER.INPUT_PASSWORD}
              placeholderTextColor={FIND_PASSWORD.PLACE_HOLDER.COLOR}
              secureTextEntry={true}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity
              style={LeaveAccountModalStyles.logoutModalButton}
              onPress={handleLeaveAccount}>
              <Text style={LeaveAccountModalStyles.logoutModalButtonText}>
                네, 탈퇴할게요
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default LeaveAccountModal;
