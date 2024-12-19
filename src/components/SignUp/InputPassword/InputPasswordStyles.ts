import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const InputPasswordStyles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    width: '100%',
    marginTop: 20,
  },
  codeButton: {
    position: 'absolute',
    right: 0,
    top: 35,
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  deleteImage: {
    width: width * 0.05,
    height: width * 0.05,
  },
  requestCodeButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    borderRadius: 20,
    fontFamily: 'NanumSquareNeo-Variable',
  },
});
