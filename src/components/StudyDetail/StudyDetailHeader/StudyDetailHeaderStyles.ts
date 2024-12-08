import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';
import {StyleSheet} from 'react-native';

export const StudyDetailHeaderStyles = StyleSheet.create({
  studyHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,
  },
  studyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  studyTitle: {
    fontSize: 27,
    fontWeight: '900',
    color: '#454545',
    fontFamily: `${FONT}`,
    marginTop: 20,
    marginBottom: 5,
    width: '100%',
  },
  totalStudyTimeValue: {
    color: '#009499',
  },
  totalStudyTime: {
    fontSize: 14,
    color: '#454545',
    fontWeight: '700',
    fontFamily: `${FONT}`,
    width: '100%',
  },
  certifyButton: {
    backgroundColor: '#1AA5AA',
    width: 170,
    height: 50,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  certifyButtonText: {
    color: `${COLOR.WHITE}`,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: `${FONT}`,
  },
  redStar: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  membersHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  membersTitle: {
    fontSize: 16,
    color: '#454545',
    fontWeight: '900',
    fontFamily: `${FONT}`,
  },
  addMemberButton: {
    backgroundColor: '#1AA5AA',
    width: 120,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addMemberButtonText: {
    color: `${COLOR.WHITE}`,
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '900',
    fontFamily: `${FONT}`,
  },
});
