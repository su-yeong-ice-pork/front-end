import React, {useState, useEffect} from 'react';
import {ScrollView, SafeAreaView, View} from 'react-native';
import {Box} from '@/components/ui/box';
import {FriendsProfileScreenStyles} from './FriendsProfileStyles';
import {useRecoilState, useRecoilValue} from 'recoil';
import otherUsersState from '@/src/recoil/otherUserAtom';
import authState from '../../recoil/authAtom';
import BottomBar from '../../components/BottomBar/index';
import MonthCalendar from '../../components/Calendars/MonthCalendar';
import Sticker from '@/src/components/FriendsProfileScreenSection/CheerUpSticker';
import CheerupWords from '@/src/components/FriendsProfileScreenSection/CheerUpWords';
import CheerupText from '@/src/components/FriendsProfileScreenSection/CheerUpText';
import {getOtherUserDataApi} from '@/src/api/otherUsers/getOtherUsersAPI';
import {getBadgesApi} from '../../api/badge/getBadgesApi';
import {useQuery} from '@tanstack/react-query';
import Badges from '../../components/Badges';
import FriendsProfiles from '@/src/components/FriendsProfile';
import FriendsMessage from '@/src/components/FriendsProfileScreenSection/FriendsMessage';
import FriendsLeaveButton from '@/src/components/FriendsProfileScreenSection/FriendsLeaveButton';
import {useRoute} from '@react-navigation/native';
import {OtherUserInformationType} from '@/src/api/otherUsers/getOtherUsersTypes';
import {Badge} from '../../api/badge';

const FriendsProfile = () => {
  const route = useRoute();
  const {friendId} = route.params as {friendId: number};
  const [modalMessage, setModalMessage] = useState<string>('');
  const [member, setMember] = useState<OtherUserInformationType | null>(null);
  const [badges, setBadges] = useState<Badge[] | null>(null);
  const authInfo = useRecoilValue(authState);
  const [user, setUser] = useRecoilState(otherUsersState);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const {data: otherMemberData, error: memberDataError} = useQuery({
    queryKey: ['OtherMember', friendId],
    queryFn: () => getOtherUserDataApi(authInfo.authToken, friendId),
    enabled: !!authInfo.authToken && !!friendId,
  });

  useEffect(() => {
    if (otherMemberData) {
      setMember(otherMemberData.member);
      setUser(otherMemberData.member);
    } else if (memberDataError) {
      setModalMessage('프로필을 불러오는 데 실패했습니다.');
      setModalVisible(true);
    }
  }, [otherMemberData, memberDataError, setUser]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={FriendsProfileScreenStyles.container}
        contentContainerStyle={{paddingBottom: 80}}>
        <Box>
          <FriendsProfiles otherMember={user} edit={false} back={true} />
          <Box style={FriendsProfileScreenStyles.profileTextContainer}>
            <FriendsLeaveButton />
          </Box>

          <FriendsMessage />

          <Box style={FriendsProfileScreenStyles.badgeContainer}>
            <Badges badges={badges} styleType="profile" />
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
      {/* 모달이나 에러 처리 UI를 추가할 수 있습니다. */}
      {modalVisible && (
        <View>
          <Text>{modalMessage}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FriendsProfile;
