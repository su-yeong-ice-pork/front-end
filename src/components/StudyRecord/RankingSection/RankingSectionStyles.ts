import {Dimensions, StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from "@/src/constants/styles/color/color.ts";

const {width, height} = Dimensions.get('window');

export const RankingSectionStyles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:COLOR.WHITE,
  },
  headerContainer :{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height*0.025,
  },
  calendarIcon: {
    width: height*0.03,
    height: height*0.03,
    marginRight: width*0.025,
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateNumber: {
    color: '#009499',
    fontSize: height*0.021,
    fontWeight: '800',
    fontFamily:FONT,
  },
  dateText: {
    color: COLOR.BLACK,
    fontSize: height*0.021,
    fontWeight: '700',
    fontFamily:FONT,
  },



});
