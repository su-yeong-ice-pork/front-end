import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
const IMAGES = {
  slide1Image: require('../../assets/images/illustration/intro.png'),
  slide2Image: require('../../assets/images/illustration/introTwo.png'),
  slide3Image: require('../../assets/images/illustration/introThree.png'),
  slide4Image: require('../../assets/images/illustration/introFour.png'),
};

const {width} = Dimensions.get('window');

const Slides = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      key: 'slide1',
      mainText: (
        <>
          도서관 출석,{'\n'}
          <Text style={styles.highlight}>잔디</Text>처럼 쌓이는 성취감!
        </>
      ),
      subText:
        '매일 도서관에 출석할 때마다\n성장하는 나만의 잔디밭을 완성해 보세요!',
      additionalElements: (
        <>
          <Image source={IMAGES.slide1Image} style={styles.slideImage} />
        </>
      ),
    },
    {
      key: 'slide2',
      mainText: (
        <>
          함께 인증하고, {'\n'}함께 성장하는 {'\n'}
          <Text style={styles.highlight}>도서관 출석 스터디</Text>
        </>
      ),
      subText:
        '위치 인증과 스터디원들의 상호 인증으로,\n재미있고 꾸준한 도서관 생활을 만들어가요!',
      additionalElements: (
        <>
          <Image source={IMAGES.slide2Image} style={styles.slideImage} />
        </>
      ),
    },
    {
      key: 'slide3',
      mainText: (
        <>
          출석도 게임처럼! {'\n'}
          <Text style={styles.highlight}>티어</Text>와{' '}
          <Text style={styles.highlight}>레이팅</Text>으로 {'\n'}즐겁게
          도전하세요!
        </>
      ),
      subText:
        '도서관 출석으로 나만의 티어를 쌓고,\n목표를 향한 여정을 재미있게 꾸며보세요!',
      additionalElements: (
        <>
          <Image source={IMAGES.slide3Image} style={styles.slideImage} />
        </>
      ),
    },
    {
      key: 'slide4',
      mainText: (
        <>
          매일 <Text style={styles.highlight}>잔디</Text>를 심으며, {'\n'}함께
          목표를 {'\n'}이루는 스터디!
        </>
      ),
      subText:
        '하루하루 쌓이는 잔디와 함께 도서관에서\n목표를 이루는 나를 만나세요!',
      additionalElements: (
        <>
          <Image source={IMAGES.slide4Image} style={styles.slideImage} />
        </>
      ),
    },
  ];

  const renderSlide = ({item, index}) => (
    <View style={styles.slide} key={index}>
      <Text style={styles.mainText}>{item.mainText}</Text>
      <Text style={styles.subText}>{item.subText}</Text>
      {item.additionalElements}
    </View>
  );

  useEffect(() => {
    // currentIndex 변경 시 currentIndexRef 업데이트
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndexRef.current + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 3000);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(interval);
  }, []); // 의존성 배열을 빈 배열로 설정

  const handleScrollEnd = e => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  return (
    <>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onMomentumScrollEnd={handleScrollEnd}
        bounces={false}>
        {slides.map((item, index) => renderSlide({item, index}))}
      </Animated.ScrollView>

      <View style={styles.paginationContainer}>
        {slides.map((_, i) => {
          let opacity = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={i} style={[styles.dot, {opacity}]} />;
        })}
      </View>
    </>
  );
};

export default Slides;

const styles = StyleSheet.create({
  slide: {
    width: width,
    justifyContent: 'center',
    paddingTop: 0,
    marginBottom: 0,
  },
  mainText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '900',
    textAlign: 'left',
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  subText: {
    fontSize: 16,
    color: '#378260',
    fontFamily: 'NanumSquareNeo-Variable',
    textAlign: 'left',
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  highlight: {
    color: '#00470D',
  },
  slideImage: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 0,
    alignSelf: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#009499',
    marginHorizontal: 5,
  },
});
