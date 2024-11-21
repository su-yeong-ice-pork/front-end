import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import BottomBar from '../components/BottomBar';
import LinearGradient from 'react-native-linear-gradient';

import {getMemberData, Member} from '../api/profile';
import {getBadges, Badge} from '../api/badge';
import {getMyPageRecord} from '../api/myPageRecord';

import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import userState from '../recoil/userAtom';
import authState from '../recoil/authAtom';
import {setItem} from '../api/asyncStorage';
import Profile from '../components/Profile';
import ListViewBox from '../components/ListViewBox';
import GrassCard from '../components/GrassCard';
const {width, height} = Dimensions.get('window');

const IMAGES = {
  profile: require('../../assets/images/illustration/typeThree.png'),
  logo: require('../../assets/images/illustration/logo.png'),
  friendsIcon: require('../../assets/images/icons/friendsIcon.png'),
  groupsIcon: require('../../assets/images/icons/groupsIcon.png'),
  freeze: require('../../assets/images/illustration/freeze.png'),
  lockIcon: require('../../assets/images/icons/lockIcon.png'),
  logoutIcon: require('../../assets/images/icons/logoutIcon.png'),
  moreIcon: require('../../assets/images/icons/moreIcon2.png'),
  coloredFriendsIcon: require('../../assets/images/icons/coloredFriendsIcon.png'),
  coloredGroupIcon: require('../../assets/images/icons/coloredGroupIcon.png'),
  jandi1: require('../../assets/images/illustration/jandi1.png'),
  jandi2: require('../../assets/images/illustration/jandi2.png'),
  editProfile: require('../../assets/images/icons/profileEdit.png'),
  profileBackButton: require('../../assets/images/icons/profileBackButton.png'),
  sleepyFaceEmoji: require('../../assets/images/emoji/sleepyFaceEmoji.png'),
  closeLogout: require('../../assets/images/icons/closeLogout.png'),
  iIcon: require('../../assets/images/icons/iIcon.png'),
};
const BADGES = [
  require('../../assets/images/badge/badge0.png'),
  require('../../assets/images/badge/badge1.png'),
  require('../../assets/images/badge/badge2.png'),
  require('../../assets/images/badge/badge3.png'),
  require('../../assets/images/badge/badge4.png'),
  require('../../assets/images/badge/badge5.png'),
];

const ProfileScreen = ({navigation}) => {
  const [member, setMember] = useState<Member | null>(null);
  const [badges, setBadges] = useState<Badge[] | null>(null);
  const authInfo = useRecoilValue(authState);
  const [user, setUser] = useRecoilState(userState);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [totalDays, setTotalDays] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [createDate, setCreateDate] = useState<string>('');
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  const handleNotUseableModal = () => {
    setModalMessage('추가 예정인 기능입니다.');
    setModalVisible(true);
    return;
  };
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const memberData = await getMemberData(authInfo.authToken);
        if (memberData) {
          setMember(memberData);
          setUser(memberData);
          const badgesData = await getBadges(memberData.id, authInfo.authToken);
          if (badgesData) {
            setBadges(badgesData);
          } else {
            console.log('뱃지를 불러오는 데 실패했습니다.');
          }
          const recordData = await getMyPageRecord(authInfo.authToken);
          if (recordData && recordData.success) {
            setTotalDays(recordData.response.totalStreak);
            setTotalTime(recordData.response.totalStudyTime);
            setCreateDate(recordData.response.createdDate);
          } else {
            console.log('기록을 불러오는 데 실패했습니다.');
          }
        } else {
          console.log('프로필을 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.log('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchMember();
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: 80}}>
          <View style={styles.logoSection}>
            <View style={styles.logoInfo}>
              <Image source={IMAGES.logo} style={styles.logoImage} />
            </View>
          </View>

          {member?.mainBanner ? (
            // 배너 이미지가 있을 때 ImageBackground를 렌더링
            <Profile />
          ) : (
            // 배너 이미지가 없을 때 View를 렌더링하고 배경색을 적용
            <View style={styles.upperSection}>
              <TouchableOpacity
                style={styles.backButtonWrapper}
                onPress={() => navigation.goBack()}>
                <Image
                  source={IMAGES.profileBackButton}
                  style={styles.profileBackButton}
                />
              </TouchableOpacity>
              <View style={styles.profileInfo}>
                <Image
                  source={
                    member?.profileImage
                      ? {uri: member.profileImage}
                      : IMAGES.profile
                  }
                  style={styles.profileImage}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditProfile', {id: member?.id})
                  }>
                  <Image source={IMAGES.editProfile} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.content}>
            <ListViewBox
              boxTitle="현재 나의 잔디 친구"
              friendCount={user.friendCount}
              type="coloredFriendsIcon"
              type2="명"
              buttontype="friendsIcon"
              buttonText="친구목록 보기"
            />

            <ListViewBox
              boxTitle="현재 나의 잔디 스터디그룹"
              friendCount={user.studyCount}
              type="coloredGroupIcon"
              type2="개"
              buttontype="groupsIcon"
              buttonText="그룹목록 보기"
            />
            <BadgeSection
              badges={badges}
              onMorePress={() => setShowBadgeModal(true)}
            />
            <FreezeSummary
              freezeCount={member?.freezeCount}
              onPress={handleNotUseableModal}
            />
            <GrassCard name={member?.name} totalDays={totalDays} />
          </View>
          <ProfileFooter navigation={navigation} />
        </ScrollView>
        <BottomBar />

        <Modal
          animationType="slide"
          transparent={true}
          visible={showBadgeModal}
          onRequestClose={() => setShowBadgeModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.overlayTouchable}
              activeOpacity={1}
              onPress={() => setShowBadgeModal(false)}
            />

            <View style={styles.modalView}>
              <View style={styles.modalHeaderContainer}>
                <Text style={styles.modalHeaderText}>프로필 뱃지 </Text>
                <Text style={styles.modalHeaderHighlight}>
                  총 {badges ? badges.length : 0}개 보유 중
                </Text>
              </View>
              <ScrollView style={styles.modalScrollView}>
                {badges &&
                  badges.map(badge => (
                    <View key={badge.id} style={styles.modalBadge}>
                      <Image
                        source={BADGES[Number(badge.fileName)]}
                        style={styles.modalBadgeImage}
                      />
                      <View style={styles.modalBadgeInfo}>
                        <Text style={styles.modalBadgeName}>{badge.name}</Text>
                        <Text style={styles.modalBadgeDescription}>
                          {badge.description}
                        </Text>
                      </View>
                    </View>
                  ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowBadgeModal(false)}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* 추기 기능 예정입니다 모달창 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;

// InfoCard Component
const InfoCard = ({
  iconSrc,
  count,
  countText,
  text,
  buttonSrc,
  buttonText,
  subTitle,
  onButtonPress,
}) => {
  return (
    <>
      {/* SubTitle Section */}
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>

      {/* Info Card Section */}
      <View style={styles.infoCardContainer}>
        <View style={styles.infoCard}>
          <Image source={iconSrc} style={styles.infoCardIcon} />
          <Text style={styles.infoCardText}>
            <Text style={styles.infoCardCount}>
              {count}
              {countText}
            </Text>
            {text}
          </Text>
        </View>

        {/* Button Section */}
        <TouchableOpacity style={styles.infoCardButton} onPress={onButtonPress}>
          <Image source={buttonSrc} style={styles.infoCardButtonIcon} />
          <Text style={styles.infoCardButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

// BadgeSection Component
const BadgeSection = ({badges, onMorePress}) => {
  return (
    <View style={styles.badgeSection}>
      <Text style={styles.badgeTitle}>보유 뱃지</Text>
      <View style={styles.badgeContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {badges && badges.length > 0 ? (
            <>
              {badges.slice(0, 3).map(badge => (
                <Image
                  key={badge.id}
                  source={BADGES[Number(badge.fileName)]}
                  style={styles.badge}
                />
              ))}
              {badges.length > 0 && (
                <TouchableOpacity
                  onPress={onMorePress}
                  style={styles.moreButton}>
                  <Text style={styles.moreText}>...</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <Text>보유한 뱃지가 없습니다.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

// FreezeSummary Component
const FreezeSummary = ({freezeCount, onPress}) => {
  return (
    <View style={styles.frozenSection}>
      <Text style={styles.frozenTitle}>보유 프리즈</Text>
      {/* 프리즈 개수 표시 상자 */}
      <View style={styles.infoCardContainer}>
        <View style={styles.frozenDetailContainer}>
          <Text style={styles.frozenDetailText}>
            현재 총 <Text style={styles.frozenCount}>{freezeCount}</Text> 개의
            프리즈를 보유하고 있습니다.
          </Text>
        </View>

        {/* 프리즈 충전하기 버튼 */}
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            colors={['rgba(31, 209, 245, 1)', 'rgba(0, 255, 150, 1)']}
            style={styles.gradientStyle}
            start={{x: 0.5, y: 1}}
            end={{x: 0.5, y: 0}}>
            <View style={styles.frozenText}>
              <Image source={IMAGES.freeze} style={styles.freeze} />
              <Text style={styles.useFrozenButtonText}>프리즈 충전하기</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* 안내 문구 */}
      <View style={styles.iconAndTextContainer}>
        <Image source={IMAGES.iIcon} style={styles.setiIcon} />
        <Text style={styles.activeText}>
          프리즈는 잔디를 대신 채워줄 수 있는 잔디 채우기권입니다!
        </Text>
      </View>
    </View>
  );
};

// GrassSummary Component
const GrassSummary = ({name, totalDays}) => {
  return (
    <View style={styles.grassSection}>
      <Text style={styles.grassTitle}>
        <Text style={styles.highlightText}>{name}</Text>님은 지금까지
      </Text>
      <Text style={styles.grassTitle}>
        총 <Text style={styles.highlightText}>{totalDays}</Text>일의 잔디를
        심으셨어요!
      </Text>
      {/* Add charts or images related to grass summary here */}
    </View>
  );
};

// GrassButton Component
const GrassButton = ({startDate, totalDays, totalTime, ImgSrc1, ImgSrc2}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.dateText}>
          <Text style={{fontWeight: '800'}}>{startDate}</Text>에 시작하여
          지금까지 총{' '}
          <Text style={{fontSize: 15, color: '#009499', fontWeight: '500'}}>
            {totalDays}
          </Text>
          일
        </Text>
        <Image source={ImgSrc1} style={styles.image} />
      </View>
      <View style={styles.card}>
        <Text style={styles.timeText}>
          지금까지{'\n'}총{' '}
          <Text style={{fontSize: 15, color: '#009499', fontWeight: '500'}}>
            {totalTime}
          </Text>
          시간의 잔디를{'\n'}
          심으셨어요!
        </Text>
        <Image source={ImgSrc2} style={styles.image} />
      </View>
    </View>
  );
};

// ProfileFooter Component
const ProfileFooter = ({navigation}) => {
  const [showLogOut, setShowLogOut] = useState(false);
  const setAuthState = useSetRecoilState(authState);
  const handleLogout = async () => {
    try {
      await setItem('refreshToken', '');
      await setItem('autoLogin', 'N');
      setAuthState({email: '', authToken: ''});
      setShowLogOut(false);
      navigation.navigate('Landing');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() =>
          navigation.navigate('FindPassword', {title: '비밀번호 변경하기'})
        }
        activeOpacity={0.7}>
        <Image source={IMAGES.lockIcon} style={styles.footerIcon} />
        <Text style={styles.footerButtonText}>비밀번호 변경하기</Text>
      </TouchableOpacity>
      <View style={styles.footerDivider} />
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => setShowLogOut(true)}>
        <Image source={IMAGES.logoutIcon} style={styles.footerIcon} />
        <Text style={styles.footerButtonText}>로그아웃</Text>
      </TouchableOpacity>
      {/* 로그아웃 팝업창 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLogOut}
        onRequestClose={() => setShowLogOut(false)}>
        <TouchableOpacity
          style={styles.logoutModalOverlay}
          activeOpacity={1}
          onPress={() => setShowLogOut(false)}>
          <View style={styles.logoutModalView}>
            <View style={styles.logoutModalHeader}>
              <Image
                source={IMAGES.sleepyFaceEmoji}
                style={styles.logoutModalSleepyEmoji}
              />
              <View style={styles.logoutModalTextWrapper}>
                <Text style={styles.logoutModalText}>
                  정말 로그아웃 하실건가요?
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowLogOut(false)}
                style={styles.logoutModalCloseButton}>
                <Image
                  source={IMAGES.closeLogout}
                  style={styles.logoutModalCloseIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.logoutModalContent}>
              <Text style={styles.logoutModalDescription}>
                조금만 더 하면 잔디가 더 푸르게 자랄 수 있어요!{'\n'}
                잔디는 언제나 기다리고 있을게요.
              </Text>
              <TouchableOpacity
                style={styles.logoutModalButton}
                onPress={handleLogout}>
                <Text style={styles.logoutModalButtonText}>네, 잘가요!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: width,
    height: height,
  },
  content: {
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.01,
  },
  profileHeader: {
    flexDirection: 'column',
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
    width: '100%',
    height: 100, // 배너의 높이를 원하는 대로하세요 조절
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#86C0AE',
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10, // 터치 영역 확대
  },
  profileBackButton: {
    position: 'absolute',
    width: 26,
    height: 26,
    resizeMode: 'contain',
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
  editIcon: {
    position: 'absolute',
    width: 30, // 이전에 제안된 크기 유지
    height: 30, // 이전에 제안된 크기 유지
    right: -30, // profileImage의 우측 바깥쪽 경계에 위치시키기 위한 값
    bottom: -5, // profileImage의 하단 바깥쪽 경계에 위치시키기 위한 값
    resizeMode: 'contain', // 이미지 비율 유지
  },
  profileTextContainer: {
    marginLeft: 15,
    marginTop: 50,
    flexDirection: 'row',
  },
  nickname: {
    fontSize: 12,
    color: '#009499',
    flexDirection: 'row',
    marginLeft: 10,
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  username: {
    fontSize: 20,
    fontWeight: '900',
    color: '#333',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: -10,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  infoCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTitleContainer: {
    marginTop: 32,
  },
  subTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#838F8F',
    marginBottom: 5,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.055,
    width: width * 0.6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width * 0.035,
    borderRadius: 4,
  },
  infoCardIcon: {
    width: width * 0.04,
    height: width * 0.04,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  infoCardText: {
    fontSize: width * 0.027,
    fontWeight: '700',
    color: '#B6B6B6',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  infoCardCount: {
    fontSize: width * 0.038,
    color: '#0D9488',
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  infoCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.055,
    borderRadius: 4,
    backgroundColor: '#0D9488',
    paddingHorizontal: width * 0.03,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  infoCardButtonIcon: {
    width: width * 0.03,
    height: width * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.015,
  },
  infoCardButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.028,
    fontWeight: '800',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  badgeSection: {
    marginTop: 16, // mt-4
    width: width * 0.6,
  },
  badgeTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#838F8F',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  badgeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    height: height * 0.06,
    width: width * 0.6,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 4,
    marginTop: height * 0.005,
  },
  badge: {
    width: 25,
    height: 25,
    marginRight: 7,
    resizeMode: 'contain',
  },
  moreButton: {
    color: '#009499',
    flexDirection: 'row',
  },
  moreText: {
    fontSize: 12, // text-xs
    fontWeight: '800', // font-extrabold
    color: '#0D9488', // text-teal-600
    marginLeft: 5,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  moreImage: {
    marginTop: 8,
    marginLeft: 15,
    marginRight: 5,
  },
  frozenSection: {
    marginTop: 16,
  },
  frozenTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: 5,
    fontFamily: 'NanumSquareNeo-Variable',
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
  gradientStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingHorizontal: width * 0.03,
  },
  frozenText: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.055,
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.0005,
  },
  activeText: {
    fontFamily: 'NanumSquareNeo-aLt',
    color: '#009499',
    fontSize: 11,
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
  frozenNote: {
    fontSize: width * 0.03,
    color: '#009499',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  setiIcon: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  grassSection: {
    marginTop: 56, // mt-14
  },
  grassTitle: {
    fontSize: 20, // text-xl
    fontWeight: '800', // font-extrabold
    color: '#52525B', // text-neutral-600
    fontFamily: 'NanumSquareNeo-Variable',
  },
  scrollView: {
    flex: 1,
  },
  highlightText: {
    color: '#0D9488', // text-teal-600
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '800',
  },

  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.01,
    width: width * 0.4,
    height: height * 0.25,
  },
  dateText: {
    fontSize: width * 0.03,
    textAlign: 'center',
    marginTop: height * 0.01,
    marginBottom: -height * 0.01,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
    color: '#000000',
  },
  timeText: {
    fontSize: width * 0.03,
    textAlign: 'center',
    marginTop: height * 0.01,
    marginBottom: -height * 0.01,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
    color: '#000000',
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'contain',
  },

  footer: {
    marginTop: 24, // mt-6
    alignItems: 'center',
    width: width,
    marginBottom: 20,
  },
  footerButton: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'center', // Center content horizontally
    backgroundColor: '#FFFFFF', // bg-white
    paddingVertical: 12, // py-3
    paddingHorizontal: 24, // px-6
  },
  footerIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
    marginRight: 10, // gap-2.5
  },
  footerButtonText: {
    fontSize: 14, // text-sm
    fontWeight: '800', // font-extrabold
    color: '#52525B', // text-neutral-600
    fontFamily: 'NanumSquareNeo-Variable',
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#D1D5DB', // border-zinc-300
    width: '100%',
  },

  // 로그아웃 팝업창
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperView: {
    flexDirection: 'row',
    backgroundColor: '#009499',
    height: 30,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sleepyEmoji: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  closeIcon: {
    width: 20,
    height: 20,
  },

  button: {
    backgroundColor: '#009499',
    borderRadius: 20,
    width: width * 0.25,
    padding: 10,
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: width * 0.8,
  },
  lowerSection: {
    backgroundColor: '#FFFFFF',
    width: width * 0.8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '800',
  },
  buttonContainer: {
    flexDirection: 'row', // 버튼을 수평으로 정렬
    justifyContent: 'center', // 가로 방향으로 중앙 정렬
    width: '100%', // 부모 컨테이너의 전체 너비 사용
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
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

  // Logout Modal styles
  logoutModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoutModalView: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  logoutModalHeader: {
    flexDirection: 'row',
    backgroundColor: '#009499',
    height: 50,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
  },
  logoutModalSleepyEmoji: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  logoutModalTextWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutModalText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  logoutModalCloseButton: {
    position: 'absolute',
    right: 10,
  },
  overlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoutModalCloseIcon: {
    width: 20,
    height: 20,
  },
  logoutModalContent: {
    padding: 20,
    alignItems: 'center',
  },
  logoutModalDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '800',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#000000',
  },
  logoutModalButton: {
    backgroundColor: '#009499',
    borderRadius: 20,
    width: width * 0.25,
    padding: 10,
  },
  logoutModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.02,
  },
  modalHeaderText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  modalHeaderHighlight: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#1AA5AA',
    paddingHorizontal: 5,
    borderRadius: 3,
    marginTop: 3,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  modalScrollView: {
    width: '100%',
    marginBottom: height * 0.02,
  },
  modalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#E0E0E0',
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
    fontFamily: 'NanumSquareNeo-Variable',
  },
  modalBadgeDescription: {
    fontSize: 12,
    marginTop: 5,
    color: '#555',
    fontFamily: 'NanumSquareNeo-Variable',
  },
});
