import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const h10Px = height * 0.0115;
const w10Px = width * 0.025;

export const StudyDetailHeaderStyles = StyleSheet.create({
  studyHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: h10Px * 2,
    marginTop: 0,
  },
  studyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  studyTitle: {
    fontSize: w10Px * 2.7,
    fontWeight: '900',
    color: '#454545',
    fontFamily: `${FONT}`,
    marginTop: h10Px * 2,
    marginBottom: h10Px * 0.5,
    width: '100%',
  },
  totalStudyTimeValue: {
    color: '#009499',
  },
  totalStudyTime: {
    fontSize: w10Px * 1.4,
    color: '#454545',
    fontWeight: '700',
    fontFamily: `${FONT}`,
    width: '100%',
  },
  certifyButton: {
    backgroundColor: '#1AA5AA',
    width: w10Px * 15,
    height: h10Px * 5,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: w10Px,
    paddingRight: w10Px,
    marginTop: h10Px,
  },
  certifyButtonText: {
    color: `${COLOR.WHITE}`,
    fontSize: w10Px * 1.4,
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
    fontSize: w10Px * 1.6,
    color: '#454545',
    fontWeight: '900',
    fontFamily: `${FONT}`,
  },
  addMemberButton: {
    backgroundColor: '#1AA5AA',
    width: w10Px * 12.5,
    height: h10Px * 3.5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addMemberButtonText: {
    color: `${COLOR.WHITE}`,
    fontSize: w10Px * 1.2,
    letterSpacing: 1,
    fontWeight: '900',
    fontFamily: `${FONT}`,
  },
});
