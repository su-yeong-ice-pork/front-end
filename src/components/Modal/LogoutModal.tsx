import React from 'react';
import {Modal, TouchableOpacity,Image} from 'react-native';
import {VStack,HStack,Box,Text} from '@/components/ui/index.ts'
import {LogoutModalProps} from "@/src/components/types/ModalType/LogoutModalProps.ts";
import {LogoutModalStyles} from "@/src/components/Modal/LogoutModalStyle.ts";
import {LOGOUT_MODAL} from "@/src/constants/Profile/LogoutModal.ts";
const IMAGES = {
  closeLogout: require('@/assets/images/icons/closeLogout.png'),
};

const LogoutModal: React.FC<LogoutModalProps> = ({showLogOut, setShowLogOut, handleLogout}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showLogOut}
      onRequestClose={() => setShowLogOut(false)}>
      <TouchableOpacity
        style={LogoutModalStyles.logoutModalOverlay}
        activeOpacity={1}
        onPress={() => setShowLogOut(false)}>
        <VStack style={LogoutModalStyles.logoutModalView}>
          <HStack style={LogoutModalStyles.logoutModalHeader}>
            <Box style={LogoutModalStyles.logoutModalTextWrapper}>
              <Text style={LogoutModalStyles.logoutModalText}>
                {LOGOUT_MODAL.TITLE}
              </Text>
            </Box>
            <TouchableOpacity
              onPress={() => setShowLogOut(false)}
              style={LogoutModalStyles.logoutModalCloseButton}>
              <Image
                source={IMAGES.closeLogout}
                style={LogoutModalStyles.logoutModalCloseIcon}
              />
            </TouchableOpacity>
          </HStack>
          <VStack style={LogoutModalStyles.logoutModalContent}>
            <Text style={LogoutModalStyles.logoutModalDescription}>
              {LOGOUT_MODAL.CONTENT}
            </Text>
            <TouchableOpacity
              style={LogoutModalStyles.logoutModalButton}
              onPress={handleLogout}>
              <Text style={LogoutModalStyles.logoutModalButtonText}>{LOGOUT_MODAL.LOGOUT_BUTTON}</Text>
            </TouchableOpacity>
          </VStack>
        </VStack>
      </TouchableOpacity>
    </Modal>
  );
};

export default LogoutModal;
