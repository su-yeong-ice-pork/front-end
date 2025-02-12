import {Dimensions, StyleSheet} from "react-native";

const {width, height} = Dimensions.get('window');
const pixel10 = width*0.028;

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
    width: pixel10*8,
    height: pixel10*5,
    left: pixel10*2,
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

  // Content
  content: {
    marginTop: height * 0.025,
  },

  badgeContainer: {
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
    marginTop: height * 0.04,
  },
});
