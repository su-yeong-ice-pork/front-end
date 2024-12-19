import React, {useState, useEffect} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {Box} from '@/components/ui/box';
import {Member} from '../../api/profile';
import {FriendsProfileScreenStyles} from './FriendsProfileStyles';
import {useRecoilState, useRecoilValue} from 'recoil';
import userState from '../../recoil/userAtom';
import authState from '../../recoil/authAtom';
import BottomBar from '../../components/BottomBar/index';
import MonthCalendar from '../../components/Calendars/MonthCalendar';
import Sticker from '@/src/components/FriendsProfileScreenSection/CheerUpSticker';
import CheerupWords from '@/src/components/FriendsProfileScreenSection/CheerUpWords';
import CheerupText from '@/src/components/FriendsProfileScreenSection/CheerUpText';
import {getUserDataApi} from '../../api/user/getUserDataApi';
import {getBadgesApi} from '../../api/badge/getBadgesApi';
import {useQuery} from '@tanstack/react-query';
import Badges from '../../components/Badges';
import {Badge} from '../../api/badge';
import Profiles from '../../components/Profile';
import FriendsMessage from '@/src/components/FriendsProfileScreenSection/FriendsMessage';
import FriendsLeaveButton from '@/src/components/FriendsProfileScreenSection/FriendsLeaveButton';
const FriendsProfile = () => {
  const [modalMessage, setModalMessage] = useState<string>('');
  const [member, setMember] = useState<Member | null>(null);
  const [badges, setBadges] = useState<Badge[] | null>(null);
  const authInfo = useRecoilValue(authState);
  const [user, setUser] = useRecoilState(userState);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={FriendsProfileScreenStyles.container}
          contentContainerStyle={{paddingBottom: 80}}>
          <Box>
            <Profiles />
            <Box style={FriendsProfileScreenStyles.profileTextContainer}>
              <FriendsLeaveButton />
            </Box>

            <FriendsMessage />

            <Box style={FriendsProfileScreenStyles.badgeContainer}>
              <Badges badges={badgesData} />
            </Box>
          </Box>

          <Sticker />

          <CheerupWords />

          <CheerupText />

          <Box style={FriendsProfileScreenStyles.calendarContainer}>
            {member && <MonthCalendar userId={member.id} />}
          </Box>
        </ScrollView>
        <BottomBar />
      </SafeAreaView>
    </>
  );
};

export default FriendsProfile;
