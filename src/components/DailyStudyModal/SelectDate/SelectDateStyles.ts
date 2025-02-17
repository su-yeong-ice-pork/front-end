import {StyleSheet} from 'react-native';
import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';

export const SelectDateStyles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  box: {
    flex: 1,
  },
  dateBox: {
    flex: 1,
    marginRight: 10,
  },
  hourBox: {
    flex: 1,
    marginRight: 10,
  },
  minuteBox: {
    flex: 1,
  },
  dropDownStyle: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    borderWidth: 0,
    fontFamily: FONT,
  },
  dropDownContainerStyle: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
    fontWeight: 'bold',
  },
  arrowIcon: {
    color: COLOR.MAIN,
  },
  selectedItemContainerStyle: {
    backgroundColor: '#f0f0f0', // 선택된 항목의 배경색
    borderRadius: 5, // 선택된 항목의 테두리 반경
  },
  selectedItemLabelStyle: {
    color: COLOR.MAIN, // 선택된 항목의 텍스트 색상
    fontWeight: 'bold', // 선택된 항목의 텍스트 두께
  },
});
