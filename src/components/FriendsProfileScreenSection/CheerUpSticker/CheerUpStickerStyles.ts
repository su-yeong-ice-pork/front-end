import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';

export const CheerUpStickerStyles = StyleSheet.create({
  stickerSection: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: height * 0.01,
    fontFamily: `${FONT}`,
  },
  stickerContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: width * 0.03,
    borderRadius: 6,
    alignItems: 'center',
  },
  sticker: {
    marginHorizontal: width * 0.001,
    backgroundColor: 'white',
  },
  stickerImage: {
    width: width * 0.1,
    height: width * 0.1,
    marginLeft: -10,
  },
  enlargedStickerImage: {
    width: width * 0.15,
    height: width * 0.15,
  },
  infoText: {
    fontSize: width * 0.03,
    color: '#009499',
    marginTop: height * 0.01,
    fontFamily: `${FONT}`,
    fontWeight: '700',
  },
});
