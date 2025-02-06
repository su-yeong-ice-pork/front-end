import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';
import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const StudyItemStyles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.1,
    backgroundColor: `${COLOR.WHITE}`,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    justifyContent: 'center',
    paddingTop: 5,
  },
  buttonContainer: {
    width: width,
    backgroundColor: `${COLOR.WHITE}`,
  },
  studyTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 30,
  },
  studyTimeText: {
    fontSize: 14,
    color: '#4b5563',
    letterSpacing: 1,
    fontFamily: `${FONT}`,
    fontWeight: '800',
  },
  studyTimeHighlight: {
    color: `${COLOR.HIGHLIGHT}`,
  },
  studyInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 12,
    width: '100%',
    paddingHorizontal: 30,
  },
  studyNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studyNameText: {
    fontSize: 17,
    color: '#1e293b',
    fontWeight: '700',
    flexShrink: 1,
    fontFamily: `${FONT}`,
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  memberIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
    marginTop: 4,
    resizeMode: 'contain',
  },
  memberCountText: {
    fontSize: 15,
    color: `${COLOR.HIGHLIGHT}`,
    letterSpacing: 1,
    fontFamily: `${FONT}`,
    fontWeight: '700',
  },
  studyInfoIconAbsolute: {
    position: 'absolute',
    right: 50,
    top: 25,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  leftAction: {
    width: 95,
    height: '100%',
    backgroundColor: '#FB5858',
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: `${COLOR.BLACK}`,
    shadowOffset: {width: -4, height: 0},
    shadowOpacity: 0.19,
    shadowRadius: 11.4,
    elevation: 5,
  },
  actionIcon: {
    width: 19,
    height: 24,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  actionText: {
    position: 'absolute',
    bottom: -15,
    width: 79,
    color: `${COLOR.WHITE}`,
    fontFamily: `${FONT}`,
    fontSize: 9,
    lineHeight: 70,
    textAlign: 'center',
  },
});
