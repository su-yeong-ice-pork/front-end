import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';
import {Box, VStack} from '@/components/ui/index.ts'

import {ERROR_MESSAGE} from "@/src/constants/Profile/Profile.ts";
import {ProfileScreenStyles} from "./ProfileScreenStyle.ts"
import {useRecoilState, useRecoilValue} from 'recoil';
import userState from '../../recoil/userAtom';
import authState from '../../recoil/authAtom';
import {useQuery} from "@tanstack/react-query";
import {getUserDataApi} from "@/src/api/user/getUserDataApi.ts";
import {getBadgesApi} from "@/src/api/badge/getBadgesApi.ts";
import {useNavigation, useRoute} from "@react-navigation/native";
import {getMemberData, Member} from '../../api/profile';
import {getBadges, Badge} from '../../api/badge';
import {RootStackRouteProp} from "@/src/components/types/NavigationType/NavigationType.ts";

import Profiles from '../../components/Profile';
import ListViewBox from '../../components/ListViewBox';
import GrassCard from '../../components/GrassCard';
import ProfileAction from '../../components/ProfileAction';
import Freeze from "@/src/components/Freeze";
import Badges from "@/src/components/Badges/index.tsx";
import BottomBar from '../../components/BottomBar/index.tsx';
import UpcomingModal from "@/src/components/Modal/UpcomingModal.tsx";
import {MESSAGES} from "@/src/constants/BottomBar/Messages.ts";

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
  const navigation = useNavigation();
  const route = useRoute<RootStackRouteProp<'Profile'>>();
  const [member, setMember] = useState<Member | null>(null);

  const [badges, setBadges] = useState<Badge[] | null>(null);
  const authInfo = useRecoilValue(authState);
  const [user, setUser] = useRecoilState(userState);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const {data: memberData, error: memberDataError} = useQuery({
    queryKey: ['member'],
    queryFn: () => getUserDataApi(authInfo.authToken),
  });

  const {data: badgesData, error: badgesDataError} = useQuery({
    queryKey: ['badges', memberData?.id],
    queryFn: () => memberData ? getBadgesApi(memberData.id, authInfo.authToken) : Promise.resolve(null),
    enabled: !!memberData,
  });

  useEffect(() => {
    if (memberData) {
      //setMember(memberData);
      setUser(memberData);
    } else if (memberDataError) {
      setModalMessage(ERROR_MESSAGE.MEMBER);
      setModalVisible(true);
    }
  }, [memberData, memberDataError]);

  useEffect(() => {
    if (badgesData) {
      setBadges(badgesData);
    } else if (badgesDataError) {
      setModalMessage(ERROR_MESSAGE.BADGE);
      setModalVisible(true);
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
              <Image source={IMAGES.logo} style={ProfileScreenStyles.logoImage}/>
            </Box>
          </Box>

          {/*Profiles*/}
          {memberData?.mainBanner ? (
            <Profiles/>
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
                    memberData?.profileImage
                      ? {uri: memberData.profileImage}
                      : IMAGES.profile
                  }
                  style={ProfileScreenStyles.profileImage}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditProfile', {id: memberData?.id})
                  }>
                  <Image source={IMAGES.editProfile} style={ProfileScreenStyles.editIcon}/>
                </TouchableOpacity>
              </Box>
            </Box>
          )}
          {/*Profiles*/}

          <VStack style={ProfileScreenStyles.content}>
            <ListViewBox type="friend" count={memberData?.friendCount || 0} buttonOnPress={handleModalOpen}/>
            <ListViewBox type="group" count={memberData?.studyCount || 0} buttonOnPress={handleModalOpen}/>

            <Box style={ProfileScreenStyles.badgeContainer}>
              {badgesData ? <Badges badges={badgesData} styleType={"profile"}/> : null}
            </Box>

            <Freeze/>
            <GrassCard name={memberData?.name || ''}/>
          </VStack>

          <ProfileAction/>
        </ScrollView>
        <BottomBar/>
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
