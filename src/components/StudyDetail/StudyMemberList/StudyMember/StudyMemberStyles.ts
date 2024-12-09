import {StyleSheet} from 'react-native';

import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';

export const StudyMemberStyles = StyleSheet.create({
  memberItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingLeft: 20,
    backgroundColor: `${COLOR.WHITE}`,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E1E6E8',
    marginRight: 10,
    resizeMode: 'cover',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    color: '#454545',
    fontWeight: '900',
    fontFamily: `${FONT}`,
    marginBottom: 5,
    width: '100%',
  },
  memberStatus: {
    fontSize: 13,
    color: '#009499',
    marginBottom: 5,
  },
  memberStudyTime: {
    fontSize: 15,
    color: '#646464',
    fontWeight: '900',
    fontFamily: `${FONT}`,
    width: '100%',
  },
  totalStudyTimeValue: {
    color: '#009499',
  },
});
