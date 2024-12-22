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
import {Badge} from '@/components/ui/badge';
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
import {useQuery} from '@tanstack/react-query';
import Badges from '../../components/Badges';
import Profiles from '../../components/Profile';
import Freeze from '../../components/Freeze';
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
      setModalMessage('�������� �ҷ����� �� �����߽��ϴ�.');
      setModalVisible(true);
    }
  }, [memberData, memberDataError]);

  useEffect(() => {
    if (badgesData) {
      setBadges(badgesData);
    } else if (badgesDataError) {
      setModalMessage('������ �ҷ����� �� �����߽��ϴ�.');
      setModalVisible(true);
    }
  }, [badgesData, badgesDataError]);

  const handleNotUseableModal = () => {
    setModalMessage('�߰� ������ ����Դϴ�.');
    setModalVisible(true);
    return;
  };
  const handleSelfCertify = async () => {
    setIsLoading(true);
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setModalMessage('��ġ ������ �ʿ��մϴ�.');
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
          setModalMessage('���� ��ū�� �����ϴ�.');
          setModalVisible(true);
          setIsLoading(false);
          return;
        }
        const response = await postGrass(token);
        if (response.success) {
          setModalMessage('������ �����߽��ϴ�!');
        } else {
          setModalMessage(`${response.error.error.message}`);
        }
      } else {
        setModalMessage('���� ������ �ƴմϴ�.');
      }
      setModalVisible(true);
    } catch (error) {
      console.warn('��ġ �������� ����:', error);
      setModalMessage('��ġ �������⿡ �����߽��ϴ�.');
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
          {/* ��� ������ ���� */}

          <Profiles />

          <View style={HomeScreenStyles.profileTextContainer}>
            <Badges badges={badgesData} />
          </View>

          <AuthButtons />

          {/* ���� ������ �� ���� �ϼ� */}
          <Freeze />

          {/* ���� �ϼ� ǥ�� */}

          {/* �޷� �κ� */}
          <View>{member && <MonthCalendar userId={member.id} />}</View>
        </ScrollView>
        <BottomBar />
        {/* ���� ��� ��� */}
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
                <Text style={HomeScreenStyles.closeButtonText}>�ݱ�</Text>
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
