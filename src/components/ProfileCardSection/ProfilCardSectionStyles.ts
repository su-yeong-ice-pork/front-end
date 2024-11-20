import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const ProfilCardSectionStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
  },
  leftSection: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 0.45,
  },
  messageBubble: {
    backgroundColor: '#DEEFEA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 13,
    color: '#454545',
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  rightSection: {
    flex: 0.55,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  timerLabel: {
    fontSize: 14,
    color: '#454545',
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  timer: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#14B8A6',
  },
  totalTimeLabel: {
    fontSize: 12,
    color: '#454545',
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    marginTop: 10,
  },
  totalTime: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#14B8A6',
  },
  profileCardContainer: {
    width: width - 40,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignSelf: 'center',
  },
  profileCardTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4b5563',
    marginBottom: 20,
    lineHeight: 30,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  highlightText: {
    color: '#15D58A',
    fontWeight: '900',
    fontSize: 22,
    fontFamily: 'NanumSquareNeo-Variable',
  },
});
