import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';

export const CheerupWordsStyles = StyleSheet.create({
  supportMessageSection: {
    padding: width * 0.02,
    backgroundColor: '#F2F4F6',
    borderRadius: width * 0.02,
    marginHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.035,
    marginLeft: width * 0.012,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: 5,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  supportButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: width * 0.003,
    borderColor: '#5AA6A8',
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 2,
    alignItems: 'center',
    minWidth: width * 0.2,
  },
  supportButtonText: {
    color: '#5AA6A8',
    fontWeight: 'bold',
    fontSize: 15,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: width * 0.03,
    color: '#009499',
    marginTop: height * 0.005,
    textAlign: 'center',
    fontFamily: `${FONT}`,
    fontWeight: 700,
  },
});
