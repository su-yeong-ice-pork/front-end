import {StyleSheet,Dimensions} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color.ts';

const {width, height} = Dimensions.get('window');

export const InputFieldStyles = StyleSheet.create({
  container: {
    marginTop: height*0.028,
    marginHorizontal: width*0.056,
  },
  title: {
    fontFamily: FONT,
    fontSize: height*0.016,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  star : {
    color:'#FF7360',
    fontFamily: FONT,
    fontSize: height*0.016,
  },
  input: {
    height: height*0.058,
    backgroundColor:COLOR.WHITE,
    borderRadius: 6,
    paddingHorizontal: width*0.046,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode:'contain',
    marginRight: width*0.015,
  },
  inputPlaceholder: {
    flex: 1,
    height: '100%',
    fontFamily: FONT,
    fontSize: height*0.014,
    fontWeight:'bold',
  },
  clearButton:{
    width: 20,
    height: 20,
  },
  i_Icon:{
    height:height*0.011,
    width:height*0.011,
    marginHorizontal: width*0.011,
  },
  description: {
    fontSize: height*0.011,
    color: '#009499',
    fontFamily: FONT,
    fontWeight:'semibold',
  },
  errorMessage:{
    fontSize: height*0.012,
    color: '#FF7360',
    fontFamily: FONT,
    fontWeight:'semibold',
    paddingLeft: width*0.05,
  }
});
