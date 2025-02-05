// src/screens/HomeScreen.tsx

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import {HomeScreenStyles} from './HomeScreenStyles';
import BottomBar from '@/src/components/BottomBar';
const {width, height} = Dimensions.get('window');
import MonthCalendar from '@/src/components/Calendars/MonthCalendar';
import Loader from '@/src/components/Loader';
import {Member} from '@/src/api/profile';
import {postGrass} from '@/src/api/grass';
import {
  requestLocationPermission,
  getCurrentLocation,
} from '../../utils/locationUtils';
import {
  SERVICE_AREA,
  isPointInPolygon,
  Coordinate,
} from '../../utils/serviceArea';
import {useRecoilState, useRecoilValue} from 'recoil';
import userState from '../../recoil/userAtom';
import authState from '../../recoil/authAtom';
import AuthButtons from '../../components/AuthButtons';
import {getUserDataApi} from '../../api/user/getUserDataApi';
import {getBadgesApi} from '../../api/badge/getBadgesApi';
import {getRecordDataApi} from '@/src/api/record/getRecordDataApi';
import {useQuery} from '@tanstack/react-query';
import Badges from '../../components/Badges';
import Profiles from '../../components/Profile';
import Freeze from '../../components/Freeze';
import {Record} from '@/src/api/record/getRecordDataType';
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
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={HomeScreenStyles.container}
          contentContainerStyle={{paddingBottom: 80}}>
          {/* 상단 프로필 영역 */}

          <Profiles member={[memberData]} />

          <View style={HomeScreenStyles.profileTextContainer}>
            <Badges badges={badgesData} />
          </View>

          <AuthButtons />

          {/* 보유 프리즈 및 현재 일수 */}
          <Freeze />

          {/* 현재 일수 표시 */}

          {/* 달력 부분 */}
          <View>{member && <MonthCalendar userId={member.id} />}</View>
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
            style={HomeScreenStyles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}>
            <View style={HomeScreenStyles.modalView}>
              <Text style={HomeScreenStyles.modalText}>{modalMessage}</Text>
              <TouchableOpacity
                style={HomeScreenStyles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={HomeScreenStyles.closeButtonText}>닫기</Text>
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
