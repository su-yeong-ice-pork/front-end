import {Dimensions, StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font.ts';
import {COLOR} from '@/src/constants/styles/color/color.ts';

const {width, height} = Dimensions.get('window');
const pointColor = '#009499';

export const RandomStudyMemberListStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  item: {
    backgroundColor: '#F7F7F7',
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    height: height * 0.11,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  nameText: {
    fontFamily: FONT,
    fontWeight: 700,
    color: COLOR.BLACK,
    fontSize: width * 0.034,
    marginBottom: height * 0.006,
  },
  titleText: {
    fontFamily: FONT,
    fontWeight: 800,
    color: '#646464',
    fontSize: width * 0.03,
    marginBottom: width * 0.008,
  },

  profileImage: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 20,
    marginRight: width * 0.05,
  },
  scoreText: {
    fontFamily: FONT,
    fontWeight: 800,
    color: pointColor,
    fontSize: width * 0.03,
    marginBottom: width * 0.008,
  },
});
