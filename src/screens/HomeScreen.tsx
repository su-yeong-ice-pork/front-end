// src/screens/HomeScreen.tsx

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import BottomBar from '../components/BottomBar/index';
const {width, height} = Dimensions.get('window');
import CalendarScreen from '../components/calendar';
import Loader from '../components/Loader';
import {Member} from '../api/profile';
import {Badge} from '../api/badge';
import {postGrass} from '../api/grass';
import {
  requestLocationPermission,
  getCurrentLocation,
} from '../utils/locationUtils';
import {SERVICE_AREA, isPointInPolygon, Coordinate} from '../utils/serviceArea';
import {useRecoilState, useRecoilValue} from 'recoil';
import userState from '../recoil/userAtom';
import authState from '../recoil/authAtom';
import AuthButtons from '../components/AuthButtons';
import {getUserDataApi} from '../api/user/getUserDataApi';
import {getBadgesApi} from '../api/badge/getBadgesApi';
import {useQuery} from '@tanstack/react-query';
import Badges from '../components/Badges';
import Profiles from '../components/Profile';
import Freeze from '../components/Freeze';
const HomeScreen = () => {
  const authInfo = useRecoilValue(authState);
  const [user, setUser] = useRecoilState(userState);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [member, setMember] = useState<Member | null>(null);
  const [badges, setBadges] = useState<Badge[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const {data: memberData, error: memberDataError} = useQuery({
    queryKey: ['member'],
    queryFn: () => getUserDataApi(authInfo.authToken),
  });

  const {data: badgesData, error: badgesDataError} = useQuery({
    queryKey: ['badges', memberData?.id],
    queryFn: () => getBadgesApi(memberData.id, authInfo.authToken),
    enabled: !!memberData,
  });

  useEffect(() => {
    if (memberData) {
      setMember(memberData);
      setUser(memberData);
    } else if (memberDataError) {
      setModalMessage('프로필을 불러오는 데 실패했습니다.');
      setModalVisible(true);
    }
  }, [memberData, memberDataError]);

  useEffect(() => {
    if (badgesData) {
      setBadges(badgesData);
    } else if (badgesDataError) {
      setModalMessage('뱃지를 불러오는 데 실패했습니다.');
      setModalVisible(true);
    }
  }, [badgesData, badgesDataError]);

  const handleNotUseableModal = () => {
    setModalMessage('추가 예정인 기능입니다.');
    setModalVisible(true);
    return;
  };
  const handleSelfCertify = async () => {
    setIsLoading(true);
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setModalMessage('위치 권한이 필요합니다.');
      setModalVisible(true);
      setIsLoading(false);
      return;
    }

    try {
      const location: {latitude: number; longitude: number} =
        await getCurrentLocation();
      const userCoordinate: Coordinate = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const isInside = isPointInPolygon(userCoordinate, SERVICE_AREA);

      if (isInside || user.name === 'ADMIN') {
        const token = authInfo.authToken;
        if (!token) {
          setModalMessage('인증 토큰이 없습니다.');
          setModalVisible(true);
          setIsLoading(false);
          return;
        }
        const response = await postGrass(token);
        if (response.success) {
          setModalMessage('인증에 성공했습니다!');
        } else {
          setModalMessage(`${response.error.error.message}`);
        }
      } else {
        setModalMessage('서비스 지역이 아닙니다.');
      }
      setModalVisible(true);
    } catch (error) {
      console.warn('위치 가져오기 실패:', error);
      setModalMessage('위치 가져오기에 실패했습니다.');
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };
  const IMAGES = {
    freeze: require('../../assets/images/illustration/freeze.png'),
    iIcon: require('../../assets/images/icons/iIcon.png'),
    moreIcon: require('../../assets/images/icons/moreIcon2.png'),
  };
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: 80}}>
          {/* 상단 프로필 영역 */}

          <Profiles />

          <View style={styles.profileTextContainer}>
            <Badges badges={badgesData} />
          </View>

          <AuthButtons />

          {/* 보유 프리즈 및 현재 일수 */}
          <Freeze />

          {/* 현재 일수 표시 */}

          {/* 달력 부분 */}
          <View>{member && <CalendarScreen userId={member.id} />}</View>
        </ScrollView>
        <BottomBar />
        {/* 인증 결과 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        {isLoading && <Loader />}
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: width,
    height: height,
  },
  logoSection: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoInfo: {
    flexDirection: 'row',
  },
  logoImage: {
    width: 80,
    height: 50,
    left: 20,
    resizeMode: 'contain',
  },
  upperSection: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#86C0AE',
  },
  profileInfo: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 50,
    left: 30,
    borderRadius: 50,
  },
  profileTextContainer: {
    marginLeft: 130,
    marginTop: -30,
    flexDirection: 'row',
  },
  nickname: {
    fontSize: 12,
    color: '#009499',
    flexDirection: 'row',
    marginLeft: 10,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: -10,
    fontFamily: 'NanumSquareNeo-Variable',
  },

  frozenSection: {
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.02,
  },
  frozenTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: 5,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  infoCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frozenDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.055,
    width: width * 0.6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width * 0.03,
    marginRight: width * 0.02,
    borderRadius: 4,
  },
  frozenDetailText: {
    fontSize: width * 0.027,
    fontWeight: '800',
    color: '#B6B6B6',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  frozenCount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#12A5B0',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  useFrozenButton: {
    backgroundColor: '#1AA5AA',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.03,
  },
  gradientStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingHorizontal: width * 0.03,
  },
  frozenText: {
    backgroundColor: '#12A5B0',
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.055,
    justifyContent: 'center',
    borderRadius: 3,
    paddingHorizontal: width * 0.03,
  },
  useFrozenButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.028,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  freeze: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
    marginRight: width * 0.01,
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.0005,
  },
  setiIcon: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  activeText: {
    fontFamily: 'NanumSquareNeo-aLt',
    color: '#009499',
    fontSize: 11,
  },

  // 모달 스타일
  modalHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.02,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalView: {
    width: width * 0.8,
    maxHeight: height * 0.6,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: width * 0.05,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: height * 0.02,
    textAlign: 'left',
    fontSize: width * 0.04,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#000000',
  },
  closeButton: {
    backgroundColor: '#1AA5AA',
    borderRadius: 4,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.035,
  },
  modalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#E0E0E0', // 회색 네모 배경
    borderRadius: 5,
    padding: 10,
  },
  modalBadgeImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    resizeMode: 'contain',
  },
  modalBadgeInfo: {
    flex: 1,
  },
  modalBadgeName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalBadgeDescription: {
    fontSize: 12,
    marginTop: 5,
    color: '#555',
  },
  modalHeaderText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#000',
    textAlign: 'left',
  },

  modalHeaderHighlight: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#1AA5AA',
    paddingHorizontal: 5,
    borderRadius: 3,
    marginTop: 3,
  },
  modalScrollView: {
    width: '100%',
    marginBottom: height * 0.02,
  },
});
