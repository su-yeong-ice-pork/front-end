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

import {ProfileScreenStyles} from "./ProfileScreenStyle.ts"
import BottomBar from '../../components/BottomBar/index.tsx';
import LinearGradient from 'react-native-linear-gradient';

import {getMemberData, Member} from '../../api/profile';
import {getBadges, Badge} from '../../api/badge';
import {getMyPageRecord} from '../../api/myPageRecord';

import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import userState from '../../recoil/userAtom';
import authState from '../../recoil/authAtom';
import {setItem} from '../../api/asyncStorage';
import Profiles from '../../components/Profile';
import ListViewBox from '../../components/ListViewBox';
import GrassCard from '../../components/GrassCard';
import ProfileAction from '../../components/ProfileAction';
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
                    style={ProfileScreenStyles.container}
                    contentContainerStyle={{paddingBottom: 80}}>
                    <View style={ProfileScreenStyles.logoSection}>
                        <View style={ProfileScreenStyles.logoInfo}>
                            <Image source={IMAGES.logo} style={ProfileScreenStyles.logoImage} />
                        </View>
                    </View>

                    {member?.mainBanner ? (
                        <Profiles />
                    ) : (
                        <View style={ProfileScreenStyles.upperSection}>
                            <TouchableOpacity
                                style={ProfileScreenStyles.backButtonWrapper}
                                onPress={() => navigation.goBack()}>
                                <Image
                                    source={IMAGES.profileBackButton}
                                    style={ProfileScreenStyles.profileBackButton}
                                />
                            </TouchableOpacity>
                            <View style={ProfileScreenStyles.profileInfo}>
                                <Image
                                    source={
                                        member?.profileImage
                                            ? {uri: member.profileImage}
                                            : IMAGES.profile
                                    }
                                    style={ProfileScreenStyles.profileImage}
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('EditProfile', {id: member?.id})
                                    }>
                                    <Image source={IMAGES.editProfile} style={ProfileScreenStyles.editIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    <View style={ProfileScreenStyles.content}>
                        <ListViewBox type="friend" count={0} />

                        <ListViewBox type="group" count={0} />

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
                    <ProfileAction />
                </ScrollView>
                <BottomBar />
            </SafeAreaView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showBadgeModal}
                onRequestClose={() => setShowBadgeModal(false)}>
                <View style={ProfileScreenStyles.modalOverlay}>
                    <TouchableOpacity
                        style={ProfileScreenStyles.overlayTouchable}
                        activeOpacity={1}
                        onPress={() => setShowBadgeModal(false)}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showBadgeModal}
                        onRequestClose={() => setShowBadgeModal(false)}>
                        <View style={ProfileScreenStyles.modalOverlay}>
                            <TouchableOpacity
                                style={ProfileScreenStyles.overlayTouchable}
                                activeOpacity={1}
                                onPress={() => setShowBadgeModal(false)}
                            />

                            <View style={ProfileScreenStyles.modalView}>
                                <View style={ProfileScreenStyles.modalHeaderContainer}>
                                    <Text style={ProfileScreenStyles.modalHeaderText}>프로필 뱃지 </Text>
                                    <Text style={ProfileScreenStyles.modalHeaderHighlight}>
                                        총 {badges ? badges.length : 0}개 보유 중
                                    </Text>
                                </View>
                                <ScrollView style={ProfileScreenStyles.modalScrollView}>
                                    {badges &&
                                        badges.map(badge => (
                                            <View key={badge.id} style={ProfileScreenStyles.modalBadge}>
                                                <Image
                                                    source={BADGES[Number(badge.fileName)]}
                                                    style={ProfileScreenStyles.modalBadgeImage}
                                                />
                                                <View style={ProfileScreenStyles.modalBadgeInfo}>
                                                    <Text style={ProfileScreenStyles.modalBadgeName}>
                                                        {badge.name}
                                                    </Text>
                                                    <Text style={ProfileScreenStyles.modalBadgeDescription}>
                                                        {badge.description}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))}
                                </ScrollView>
                                <TouchableOpacity
                                    style={ProfileScreenStyles.closeButton}
                                    onPress={() => setShowBadgeModal(false)}>
                                    <Text style={ProfileScreenStyles.closeButtonText}>닫기</Text>
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
                            style={ProfileScreenStyles.modalOverlay}
                            activeOpacity={1}
                            onPress={() => setModalVisible(false)}>
                            <View style={ProfileScreenStyles.modalView}>
                                <Text style={ProfileScreenStyles.modalText}>{modalMessage}</Text>
                                <TouchableOpacity
                                    style={ProfileScreenStyles.closeButton}
                                    onPress={() => setModalVisible(false)}>
                                    <Text style={ProfileScreenStyles.closeButtonText}>닫기</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>

                    <View style={ProfileScreenStyles.modalView}>
                        <View style={ProfileScreenStyles.modalHeaderContainer}>
                            <Text style={ProfileScreenStyles.modalHeaderText}>프로필 뱃지 </Text>
                            <Text style={ProfileScreenStyles.modalHeaderHighlight}>
                                총 {badges ? badges.length : 0}개 보유 중
                            </Text>
                        </View>
                        <ScrollView style={ProfileScreenStyles.modalScrollView}>
                            {badges &&
                                badges.map(badge => (
                                    <View key={badge.id} style={ProfileScreenStyles.modalBadge}>
                                        <Image
                                            source={BADGES[Number(badge.fileName)]}
                                            style={ProfileScreenStyles.modalBadgeImage}
                                        />
                                        <View style={ProfileScreenStyles.modalBadgeInfo}>
                                            <Text style={ProfileScreenStyles.modalBadgeName}>{badge.name}</Text>
                                            <Text style={ProfileScreenStyles.modalBadgeDescription}>
                                                {badge.description}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={ProfileScreenStyles.closeButton}
                            onPress={() => setShowBadgeModal(false)}>
                            <Text style={ProfileScreenStyles.closeButtonText}>닫기</Text>
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
                    style={ProfileScreenStyles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}>
                    <View style={ProfileScreenStyles.modalView}>
                        <Text style={ProfileScreenStyles.modalText}>{modalMessage}</Text>
                        <TouchableOpacity
                            style={ProfileScreenStyles.closeButton}
                            onPress={() => setModalVisible(false)}>
                            <Text style={ProfileScreenStyles.closeButtonText}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

export default ProfileScreen;

// BadgeSection Component
const BadgeSection = ({badges, onMorePress}) => {
    return (
        <View style={ProfileScreenStyles.badgeSection}>
            <Text style={ProfileScreenStyles.badgeTitle}>보유 뱃지</Text>
            <View style={ProfileScreenStyles.badgeContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {badges && badges.length > 0 ? (
                        <>
                            {badges.slice(0, 3).map(badge => (
                                <Image
                                    key={badge.id}
                                    source={BADGES[Number(badge.fileName)]}
                                    style={ProfileScreenStyles.badge}
                                />
                            ))}
                            {badges.length > 0 && (
                                <TouchableOpacity
                                    onPress={onMorePress}
                                    style={ProfileScreenStyles.moreButton}>
                                    <Text style={ProfileScreenStyles.moreText}>...</Text>
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
        <View style={ProfileScreenStyles.frozenSection}>
            <Text style={ProfileScreenStyles.frozenTitle}>보유 프리즈</Text>
            {/* 프리즈 개수 표시 상자 */}
            <View style={ProfileScreenStyles.infoCardContainer}>
                <View style={ProfileScreenStyles.frozenDetailContainer}>
                    <Text style={ProfileScreenStyles.frozenDetailText}>
                        현재 총 <Text style={ProfileScreenStyles.frozenCount}>{freezeCount}</Text> 개의
                        프리즈를 보유하고 있습니다.
                    </Text>
                </View>

                {/* 프리즈 충전하기 버튼 */}
                <TouchableOpacity onPress={onPress}>
                    <LinearGradient
                        colors={['rgba(31, 209, 245, 1)', 'rgba(0, 255, 150, 1)']}
                        style={ProfileScreenStyles.gradientStyle}
                        start={{x: 0.5, y: 1}}
                        end={{x: 0.5, y: 0}}>
                        <View style={ProfileScreenStyles.frozenText}>
                            <Image source={IMAGES.freeze} style={ProfileScreenStyles.freeze} />
                            <Text style={ProfileScreenStyles.useFrozenButtonText}>프리즈 충전하기</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            {/* 안내 문구 */}
            <View style={ProfileScreenStyles.iconAndTextContainer}>
                <Image source={IMAGES.iIcon} style={ProfileScreenStyles.setiIcon} />
                <Text style={ProfileScreenStyles.activeText}>
                    프리즈는 잔디를 대신 채워줄 수 있는 잔디 채우기권입니다!
                </Text>
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
        <View style={ProfileScreenStyles.footer}>
            <TouchableOpacity
                style={ProfileScreenStyles.footerButton}
                onPress={() =>
                    navigation.navigate('FindPassword', {title: '비밀번호 변경하기'})
                }
                activeOpacity={0.7}>
                <Image source={IMAGES.lockIcon} style={ProfileScreenStyles.footerIcon} />
                <Text style={ProfileScreenStyles.footerButtonText}>비밀번호 변경하기</Text>
            </TouchableOpacity>
            <View style={ProfileScreenStyles.footerDivider} />
            <TouchableOpacity
                style={ProfileScreenStyles.footerButton}
                onPress={() => setShowLogOut(true)}>
                <Image source={IMAGES.logoutIcon} style={ProfileScreenStyles.footerIcon} />
                <Text style={ProfileScreenStyles.footerButtonText}>로그아웃</Text>
            </TouchableOpacity>

            {/* 로그아웃 팝업창 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showLogOut}
                onRequestClose={() => setShowLogOut(false)}>
                <TouchableOpacity
                    style={ProfileScreenStyles.logoutModalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowLogOut(false)}>
                    <View style={ProfileScreenStyles.logoutModalView}>
                        <View style={ProfileScreenStyles.logoutModalHeader}>
                            <Image
                                source={IMAGES.sleepyFaceEmoji}
                                style={ProfileScreenStyles.logoutModalSleepyEmoji}
                            />
                            <View style={ProfileScreenStyles.logoutModalTextWrapper}>
                                <Text style={ProfileScreenStyles.logoutModalText}>
                                    정말 로그아웃 하실건가요?
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setShowLogOut(false)}
                                style={ProfileScreenStyles.logoutModalCloseButton}>
                                <Image
                                    source={IMAGES.closeLogout}
                                    style={ProfileScreenStyles.logoutModalCloseIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={ProfileScreenStyles.logoutModalContent}>
                            <Text style={ProfileScreenStyles.logoutModalDescription}>
                                조금만 더 하면 잔디가 더 푸르게 자랄 수 있어요!{'\n'}
                                잔디는 언제나 기다리고 있을게요.
                            </Text>
                            <TouchableOpacity
                                style={ProfileScreenStyles.logoutModalButton}
                                onPress={handleLogout}>
                                <Text style={ProfileScreenStyles.logoutModalButtonText}>네, 잘가요!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};