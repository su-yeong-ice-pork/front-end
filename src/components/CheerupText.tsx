import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const supportTextPlaceholder = '예시) 잔디야! 오늘 8시에 새도 스터디 기억하지?';

const CheerupText = () => {
  const [supportText, setSupportText] = useState('');

  const handleSendPress = () => {
    // 여기서 서버로 지원 텍스트를 전송하는 로직을 추가할 수 있습니다.
    setSupportText('');
    // 예시: Alert.alert('응원 텍스트 전송', '응원 텍스트가 전송되었습니다!');
  };

  return (
    <View style={styles.supportTextSection}>
      <Text style={styles.sectionTitle}>응원텍스트</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInputPlaceholder}
          placeholder={supportTextPlaceholder}
          maxLength={20}
          onChangeText={text => setSupportText(text)}
          value={supportText}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            supportText.trim() === '' && styles.sendButtonDisabled,
          ]}
          onPress={handleSendPress}
          disabled={supportText.trim() === ''}>
          <Text style={styles.sendButtonText}>보내기</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.infoText}>
        응원 텍스트는 최대 20자 입력, 매일 하루 2개씩 가능합니다!
      </Text>
    </View>
  );
};

export default CheerupText;

const styles = StyleSheet.create({
  supportTextSection: {
    padding: width * 0.02, // 5% of screen width
    backgroundColor: '#F2F4F6',
    borderRadius: width * 0.02, // 2% of screen width
    marginHorizontal: width * 0.03, // 5% of screen width (왼쪽과 오른쪽 마진 동일)
    marginBottom: height * 0.02, // 2% of screen height
  },
  sectionTitle: {
    fontSize: width * 0.035, // 3.5% of screen width
    marginLeft: width * 0.012, // 1.2% of screen width
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: height * 0.01, // 1% of screen height
    fontFamily: 'NanumSquareNeo-Variable',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: width * 0.003, // 0.3% of screen width
    borderColor: '#5AA6A8',
    borderRadius: width * 0.02, // 2% of screen width
    paddingHorizontal: width * 0.04, // 4% of screen width
    paddingVertical: height * 0.008, // 0.8% of screen height
    marginBottom: height * 0.015, // 1.5% of screen height
    backgroundColor: '#FFFFFF',
  },
  textInputPlaceholder: {
    color: '#81A3A5',
    flex: 1,
    fontSize: 11,
    marginLeft: 5,
  },
  sendButton: {
    backgroundColor: '#009499',
    borderRadius: width * 0.015, // 1.5% of screen width
    paddingHorizontal: width * 0.04, // 4% of screen width
    paddingVertical: height * 0.012, // 1.2% of screen height
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#B9B9B9',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  infoText: {
    fontSize: width * 0.03, // 3% of screen width
    color: '#009499',
    marginTop: height * 0.005, // 0.5% of screen height
    textAlign: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
  },
});
