import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const h10Px = height * 0.0115;
const w10Px = width * 0.025;

export const RandomStudyDetailHeaderStyles = StyleSheet.create({
  studyHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: h10Px,
    marginHorizontal: w10Px * 2,
  },
  studyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  attendanceTimeBox: {
    marginTop: h10Px * 2.5,
    backgroundColor: '#454545',
    width: w10Px * 6,
    height: h10Px * 2,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendanceTimeText: {
    fontFamily: `${FONT}`,
    color: COLOR.WHITE,
    fontWeight: 600,
    fontSize: h10Px * 1.05,
  },
  studyTitle: {
    fontSize: h10Px * 2.7,
    fontWeight: '900',
    color: '#454545',
    fontFamily: `${FONT}`,
    marginTop: h10Px,
    marginBottom: 5,
    width: '100%',
  },
  totalStudyTimeValue: {
    color: '#009499',
  },
  totalStudyTime: {
    fontSize: h10Px * 1.5,
    color: '#454545',
    fontWeight: '700',
    fontFamily: `${FONT}`,
    width: '100%',
  },
  membersHeader: {
    paddingHorizontal: w10Px * 2,
    marginVertical: h10Px * 1.5,
    marginBottom: h10Px * 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  membersTitle: {
    fontSize: h10Px * 1.6,
    color: '#454545',
    fontWeight: '900',
    fontFamily: `${FONT}`,
  },
  membersComment: {
    fontFamily: `${FONT}`,
    fontWeight: 600,
    color: '#A4A9AA',
    fontSize: h10Px * 1.2,
  },
});
