import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';

interface NoticeModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const NoticeModal: React.FC<NoticeModalProps> = ({
  visible,
  onClose,
  title,
  message,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.modalContainer}>
          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Image
              source={require('../../assets/images/icons/closeButton.png')}
              style={styles.modalCloseIcon}
            />
          </TouchableOpacity>

          <View style={styles.modalHeader}>
            <Image
              source={require('../../assets/images/icons/attendance.png')}
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <Text style={styles.modalSubtitle}>{message}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NoticeModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalIcon: {
    width: 46,
    height: 46,
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#4b5563',
    flex: 1,
  },
  modalSubtitle: {
    marginTop: 10,
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'left',
    lineHeight: 20,
    marginLeft: 56,
    fontWeight: '800',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    zIndex: 1,
  },
  modalCloseIcon: {
    width: 24,
    height: 24,
  },
});
