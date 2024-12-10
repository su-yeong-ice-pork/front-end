import {StyleSheet, Dimensions} from 'react-native';

import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';

const {width} = Dimensions.get('window');

export const StudyRecordScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width: width,
    paddingBottom: 80,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1AA5AA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 20,
    width: width - 40,
    alignSelf: 'center',
  },
  friendInfoIconAbsolute: {
    position: 'absolute',
    right: 5,
    top: 25,
    width: 30,
    height: 30,
  },
  activeTab: {
    paddingBottom: 5,
    marginHorizontal: 20,
  },
  inactiveTab: {
    opacity: 0.6,
    marginHorizontal: 20,
  },
  activeTabText: {
    color: `${COLOR.WHITE}`,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: `${FONT}`,
  },
  inactiveTabText: {
    color: `${COLOR.WHITE}`,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: `${FONT}`,
  },
});

export const ScrollContentPaddingBottom = {paddingBottom: 80};
