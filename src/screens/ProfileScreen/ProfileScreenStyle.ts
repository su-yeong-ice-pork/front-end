import {Dimensions, StyleSheet} from "react-native";

const {width, height} = Dimensions.get('window');

export const ProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: width,
    height: height,
  },

  // LOGO
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

  // Profile
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

  // Content
  content: {
    marginTop: height * 0.025,
  },
  // Content-Badge
  badgeContainer: {
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
    marginTop: height * 0.04,
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
  badgeSection: {
    marginTop: 16, // mt-4
    width: width * 0.6,
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

  gradientStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingHorizontal: width * 0.03,
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

  setiIcon: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },

  scrollView: {
    flex: 1,
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
