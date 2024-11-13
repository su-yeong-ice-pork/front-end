import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface StudyButtonProps {
  isRecording: boolean;
  onPress: () => void;
}

const {width} = Dimensions.get('window');

const StudyButton: React.FC<StudyButtonProps> = ({isRecording, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      {isRecording ? (
        <View style={[styles.button, styles.recordingButton]}>
          <Image
            source={require('../../assets/images/icons/Clock.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text
            style={styles.recordingText}
            numberOfLines={1}
            ellipsizeMode="tail">
            기록 잠시 멈추기
          </Text>
        </View>
      ) : (
        <LinearGradient
          colors={['#2CCDE4', '#25E798']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.button}>
          <Image
            source={require('../../assets/images/icons/whiteNote.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            공부 기록 시작하기
          </Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default StudyButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 130, // 최소 너비 설정
    width: width * 0.38,
    height: 30,
    paddingHorizontal: 3, // 좌우 패딩 추가
    borderRadius: 30,
    marginTop: 10,
    marginLeft: -6,
    justifyContent: 'center', // 내용 중앙 정렬
  },
  recordingButton: {
    backgroundColor: '#FE5B5B',
  },
  icon: {
    width: 20,
    height: 23,
    marginRight: 3, // 아이콘과 텍스트 사이 여백 조정
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12, // 가독성을 위해 폰트 크기 약간 증가
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    textAlign: 'center',
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    textAlign: 'center',
    flexShrink: 1,
  },
});
