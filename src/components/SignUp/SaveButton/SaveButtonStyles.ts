import {StyleSheet} from 'react-native';

import {COLOR} from '@/src/constants/styles/color/color';

export const SaveButtonStyles = StyleSheet.create({
  boxContiner: {
    marginVertical: 20,
    width: '90%',
    height: 60,
    alignSelf: 'center',
    backgroundColor: '#E1E6E8',
  },
  buttonStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  button: {
    position: 'relative',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: COLOR.WHITE,
    fontSize: 17,
    fontWeight: 'bold',
  },
});
