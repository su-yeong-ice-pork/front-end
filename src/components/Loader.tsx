// src/components/Loader.tsx
import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const Loader = () => {
  const imageSize = width * 0.5; // 화면 너비의 50%

  return (
    <View style={styles.loaderContainer}>
      <Image
        source={require('../../assets/images/illustration/loader.gif')}
        style={{width: imageSize, height: imageSize}}
        resizeMode="contain"
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 배경을 어둡게 처리하여 사용자 인터페이스 차단
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
