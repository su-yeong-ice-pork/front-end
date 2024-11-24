import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const CheerupWords = () => {
  const supportMessages = [
    {id: 1, text: '잔디 심자!'},
    {id: 2, text: '힘내!'},
    {id: 3, text: '더 심자!'},
    {id: 4, text: '잔디 챙겨!'},
  ];

  return (
    <View style={styles.supportMessageSection}>
      <Text style={styles.sectionTitle}>응원문구</Text>
      <View style={styles.messageContainer}>
        {supportMessages.map(message => (
          <TouchableOpacity key={message.id} style={styles.supportButton}>
            <Text
              style={styles.supportButtonText}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {message.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.infoText}>
        클릭한 응원문구는 상대방에게 알림이 갑니다! 문구는 매일 하루 2개씩
        가능합니다!
      </Text>
    </View>
  );
};

export default CheerupWords;

const styles = StyleSheet.create({
  supportMessageSection: {
    padding: width * 0.02, // 5% of screen width
    backgroundColor: '#F2F4F6',
    borderRadius: width * 0.02, // 2% of screen width
    marginHorizontal: width * 0.03, // 5% of screen width
    marginBottom: height * 0.02, // 2% of screen height
  },
  sectionTitle: {
    fontSize: width * 0.035, // 3.5% of screen width
    marginLeft: width * 0.012, // 1.2% of screen width
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: 5,
  },
  supportMessageSection: {
    padding: 20,
    backgroundColor: '#F2F4F6',
    borderRadius: 10,
    marginBottom: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  supportButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: width * 0.003, // 0.3% of screen width
    borderColor: '#5AA6A8',
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 2,
    alignItems: 'center',
    // Optional: 최소 너비 설정
    minWidth: width * 0.2, // 25% of screen width
  },
  supportButtonText: {
    color: '#5AA6A8',
    fontWeight: 'bold',
    fontSize: 13,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: width * 0.03, // 3% of screen width
    color: '#009499',
    marginTop: height * 0.005, // 0.5% of screen height
    textAlign: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
  },
});
