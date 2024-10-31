// src/components/BottomBar.tsx
import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const BottomBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const currentScreen = route.name;

  const images = {
    note:
      currentScreen === 'Log'
        ? require('../../assets/images/icons/noteOn.png')
        : require('../../assets/images/icons/note.png'),
    study:
      currentScreen === 'Study' || currentScreen === 'StudyDetail'
        ? require('../../assets/images/icons/studyOn.png')
        : require('../../assets/images/icons/study.png'),
    home:
      currentScreen === 'Home'
        ? require('../../assets/images/icons/homeOn.png')
        : require('../../assets/images/icons/home.png'),
    alarm:
      currentScreen === 'Alarm'
        ? require('../../assets/images/icons/alarmOn.png')
        : require('../../assets/images/icons/alarm.png'),
    profile:
      currentScreen === 'Profile'
        ? require('../../assets/images/icons/profileOn.png')
        : require('../../assets/images/icons/profile.png'),
  };

  const getLabelStyle = (screen: string) => {
    return [styles.label, currentScreen === screen && styles.labelActive];
  };

  const navigateTo = (screen: string) => {
    navigation.navigate(screen);
  };

  // Modal state and functions
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleNotUseableModal = () => {
    setModalMessage('추가 예정인 기능입니다.');
    setModalVisible(true);
    return;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigateTo('Log')}>
        <Image source={images.note} style={styles.icon} />
        <Text style={getLabelStyle('Log')}>기록장</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleNotUseableModal}>
        <Image source={images.study} style={styles.icon} />
        <Text style={getLabelStyle('Study')}>스터디</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigateTo('Home')}>
        <Image source={images.home} style={styles.icon} />
        <Text style={getLabelStyle('Home')}>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleNotUseableModal}>
        <Image source={images.alarm} style={styles.icon} />
        <Text style={getLabelStyle('Alarm')}>알림</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigateTo('Profile')}>
        <Image source={images.profile} style={styles.icon} />
        <Text style={getLabelStyle('Profile')}>프로필</Text>
      </TouchableOpacity>

      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    width: width,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
  },
  iconContainer: {
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: '#ABABAB',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
  },
  labelActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '80%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#000000',
  },
  closeButton: {
    backgroundColor: '#1AA5AA',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
