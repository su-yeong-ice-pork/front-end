import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const StudyButtonLinearGradientColor = ['#2CCDE4', '#25E798'];
export const StudyButtonLinearGradientLine = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
};
export const StudyButtonTextLine = 1;
export const IMAGE_ALT = {
  RECORD:
    '현재 시간 기록 중입니다. 버튼을 누르면 시간 기록을 종료할 수 있습니다.',
  START: '시작하기 버튼입니다. 버튼을 누르면 시간을 기록할 수 있습니다.',
};
export const StudyButtonStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 140,
    width: width * 0.38,
    height: 30,
    paddingHorizontal: 3,
    borderRadius: 30,
    justifyContent: 'center',
  },
  recordingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 140,
    width: width * 0.38,
    height: 30,
    paddingHorizontal: 3,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: '#FE5B5B',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 4,
    resizeMode: 'contain',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    textAlign: 'center',
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    textAlign: 'center',
    flexShrink: 1,
  },
});
