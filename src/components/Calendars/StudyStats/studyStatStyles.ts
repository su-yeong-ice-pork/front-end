import {StyleSheet, Dimensions} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

export const StudyStatStyles = StyleSheet.create({
  statsContainer: {
    marginTop: 18,
    padding: 10,
    backgroundColor: '#f0f4f7',
    borderRadius: 8,
    alignItems: 'flex-start',
    width: 180,
  },
  rowContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  statsText: {
    fontSize: 12,
    color: '#333',
    marginVertical: 2,
    fontFamily: `${FONT}`,
  },
  highlight: {
    color: '#1AA5AA',
    fontWeight: 'bold',
  },
  jandiColorInfo: {
    position: 'absolute',
    top: 0,
    marginLeft: 35,
    width: 130,
    height: 110,
    resizeMode: 'contain',
  },
});
