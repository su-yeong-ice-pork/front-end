import {Dimensions, StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font.ts';
import {COLOR} from '@/src/constants/styles/color/color.ts';

const {width, height} = Dimensions.get('window');
const pointColor = '#009499';

export const RankingListStyles = StyleSheet.create({
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
  topRankText: {
    fontFamily: FONT,
    fontWeight: 900,
    color: pointColor,
    fontSize: width * 0.055,
  },
  rankText: {
    fontFamily: FONT,
    fontWeight: 700,
    color: '#A5A5A5',
    fontSize: width * 0.045,
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

  // 개인 랭킹 관련 스타일
  profileImage: {
    width: width * 0.14,
    height: height * 0.071,
    borderRadius: 20,
    marginRight: width * 0.05,
    marginLeft: width * 0.03,
  },
  scoreText: {
    fontFamily: FONT,
    fontWeight: 800,
    color: pointColor,
    fontSize: width * 0.03,
    marginBottom: width * 0.008,
  },

  // 그룹(스터디) 랭킹 관련 스타일
  textContainer:{
    marginLeft: width * 0.04,

  },
  memberCount:{
    marginLeft: width * 0.03,
    alignItems: 'center',
    marginBottom: height * 0.007,
  },
  memberIcon:{
    width: width * 0.0345,
    height:height * 0.015,
    marginRight: width * 0.015,
  },
  memberCountText:{
    fontFamily: FONT,
    fontWeight: 800,
    color:pointColor,
    fontSize: width * 0.034,
  },
});
