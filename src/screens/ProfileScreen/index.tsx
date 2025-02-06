import React, {useState, useEffect} from 'react';
import {TouchableOpacity, ScrollView, SafeAreaView, Image} from 'react-native';
import {Box, VStack} from '@/components/ui/index.ts';

import {ERROR_MESSAGE} from '@/src/constants/Profile/Profile.ts';
import {ProfileScreenStyles} from './ProfileScreenStyle.ts';
import {useRecoilState, useRecoilValue} from 'recoil';
import userState from '../../recoil/userAtom';
import authState from '../../recoil/authAtom';
import {useQuery} from '@tanstack/react-query';
import {getUserDataApi} from '@/src/api/user/getUserDataApi.ts';
import {getBadgesApi} from '@/src/api/badge/getBadgesApi.ts';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Badge} from '../../api/badge';
import {RootStackRouteProp} from '@/src/components/types/NavigationType/NavigationType.ts';

import Profiles from '../../components/Profile';
import ListViewBox from '../../components/ListViewBox';
import GrassCard from '../../components/GrassCard';
import ProfileAction from '../../components/ProfileAction';
import Freeze from '@/src/components/Freeze';
import Badges from '@/src/components/Badges/index.tsx';
import BottomBar from '../../components/BottomBar/index.tsx';
import UpcomingModal from '@/src/components/Modal/UpcomingModal.tsx';
import {MESSAGES} from '@/src/constants/BottomBar/Messages.ts';

const IMAGES = {
  profile: require('@/assets/images/illustration/typeThree.png'),
  logo: require('@/assets/images/illustration/logo.png'),
  friendsIcon: require('@/assets/images/icons/friendsIcon.png'),
  groupsIcon: require('@/assets/images/icons/groupsIcon.png'),
  freeze: require('@/assets/images/illustration/freeze.png'),
  lockIcon: require('@/assets/images/icons/lockIcon.png'),
  logoutIcon: require('@/assets/images/icons/logoutIcon.png'),
  moreIcon: require('@/assets/images/icons/moreIcon2.png'),
  coloredFriendsIcon: require('@/assets/images/icons/coloredFriendsIcon.png'),
  coloredGroupIcon: require('@/assets/images/icons/coloredGroupIcon.png'),
  jandi1: require('@/assets/images/illustration/jandi1.png'),
  jandi2: require('@/assets/images/illustration/jandi2.png'),
  editProfile: require('@/assets/images/icons/profileEdit.png'),
  profileBackButton: require('@/assets/images/icons/profileBackButton.png'),
  iIcon: require('@/assets/images/icons/iIcon.png'),
};

const ProfileScreen = () => {
  const navigation = useNavigation(); // 네비게이션 객체
  const route = useRoute<RootStackRouteProp<'Profile'>>(); // 현재 라우트 정보
  const [badges, setBadges] = useState<Badge[] | null>(null);
  const authInfo = useRecoilValue(authState);
  const [user, setUser] = useRecoilState(userState);
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  // 사용자 데이터 가져오기
  const {data: memberData, error: memberDataError} = useQuery({
    queryKey: ['member'],
    queryFn: () => getUserDataApi(authInfo.authToken),
  });

  // 배지 데이터 가져오기
  const {data: badgesData, error: badgesDataError} = useQuery({
    queryKey: ['badges', memberData?.id],
    queryFn: () =>
      memberData
        ? getBadgesApi(memberData.id, authInfo.authToken)
        : Promise.resolve(null),
    enabled: !!memberData,
  });

  // 사용자 데이터가 변경될 때
  useEffect(() => {
    if (memberData) {
      setUser(memberData);
    } else if (memberDataError) {
      console.log(ERROR_MESSAGE.MEMBER);
    }
  }, [memberData, memberDataError, setUser]);

  useEffect(() => {
    if (badgesData) {
      setBadges(badgesData);
    } else if (badgesDataError) {
      console.log(ERROR_MESSAGE.BADGE);
    }
  }, [badgesData, badgesDataError]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={ProfileScreenStyles.container}
          contentContainerStyle={{paddingBottom: 80}}>
          <Box style={ProfileScreenStyles.logoSection}>
            <Box style={ProfileScreenStyles.logoInfo}>
              <Image
                source={IMAGES.logo}
                style={ProfileScreenStyles.logoImage}
              />
            </Box>
          </Box>

          {/*Profiles*/}
          {user ? (
            <Profiles member={user} />
          ) : (
            <Box style={ProfileScreenStyles.upperSection}>
              <TouchableOpacity
                style={ProfileScreenStyles.backButtonWrapper}
                onPress={() => navigation.goBack()}>
                <Image
                  source={IMAGES.profileBackButton}
                  style={ProfileScreenStyles.profileBackButton}
                />
              </TouchableOpacity>
              <Box style={ProfileScreenStyles.profileInfo}>
                <Image
                  source={
                    user?.profileImage
                      ? {uri: user.profileImage}
                      : IMAGES.profile
                  }
                  style={ProfileScreenStyles.profileImage}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditProfile', {id: user?.id})
                  }>
                  <Image
                    source={IMAGES.editProfile}
                    style={ProfileScreenStyles.editIcon}
                  />
                </TouchableOpacity>
              </Box>
            </Box>
          )}
          {/*Profiles*/}

          <VStack style={ProfileScreenStyles.content}>
            <ListViewBox
              type="friend"
              count={user?.friendCount || 0}
              buttonOnPress={handleModalOpen}
            />
            <ListViewBox
              type="group"
              count={user?.studyCount || 0}
              buttonOnPress={handleModalOpen}
            />

            <Box style={ProfileScreenStyles.badgeContainer}>
              {badges ? <Badges badges={badges} styleType={'profile'} /> : null}
            </Box>

            <Freeze />
            <GrassCard name={user?.name || ''} />
          </VStack>

          <ProfileAction />
        </ScrollView>
        <BottomBar />
      </SafeAreaView>

      <UpcomingModal
        showModal={showModal}
        setShowModal={setShowModal}
        text={MESSAGES.MODAL}
      />
    </>
  );
};

export default ProfileScreen;
