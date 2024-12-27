import React from 'react';
import {Modal, TouchableOpacity, View, Text, Image} from 'react-native';
import {ProfileScreenStyles} from '@/src/screens/ProfileScreen/ProfileScreenStyle.ts';
import {LogoutModalProps} from "@/src/components/types/ModalType/LogoutModalProps.ts"; // 스타일 파일 경로를 확인하세요
const IMAGES = {
  sleepyFaceEmoji: require('@/assets/images/emoji/sleepyFaceEmoji.png'),
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
        style={ProfileScreenStyles.logoutModalOverlay}
        activeOpacity={1}
        onPress={() => setShowLogOut(false)}>
        <View style={ProfileScreenStyles.logoutModalView}>
          <View style={ProfileScreenStyles.logoutModalHeader}>
            <Image
              source={IMAGES.sleepyFaceEmoji}
              style={ProfileScreenStyles.logoutModalSleepyEmoji}
            />
            <View style={ProfileScreenStyles.logoutModalTextWrapper}>
              <Text style={ProfileScreenStyles.logoutModalText}>
                정말 로그아웃 하실건가요?
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowLogOut(false)}
              style={ProfileScreenStyles.logoutModalCloseButton}>
              <Image
                source={IMAGES.closeLogout}
                style={ProfileScreenStyles.logoutModalCloseIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={ProfileScreenStyles.logoutModalContent}>
            <Text style={ProfileScreenStyles.logoutModalDescription}>
              조금만 더 하면 잔디가 더 푸르게 자랄 수 있어요!{'\n'}
              잔디는 언제나 기다리고 있을게요.
            </Text>
            <TouchableOpacity
              style={ProfileScreenStyles.logoutModalButton}
              onPress={handleLogout}>
              <Text style={ProfileScreenStyles.logoutModalButtonText}>네, 잘가요!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default LogoutModal;
