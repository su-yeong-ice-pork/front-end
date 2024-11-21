import {FONT} from '@/src/constants/styles/font/default-font';
import {StyleSheet} from 'react-native';

export const ProfilCardLeftSectionStyles = StyleSheet.create({
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
    fontFamily: `${FONT}`,
  },
});
