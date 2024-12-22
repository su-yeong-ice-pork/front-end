import React from 'react';

import {Animated} from 'react-native';

import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';

import {SlidesStyles, width} from './SlidesStyles';

import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {SLIDES} from '@/src/constants/Landing/Slides';

import {useSlide} from './Hook/useSlide';

const Slides = () => {
  const slides = [
    {
      key: SLIDES.ONE.KEY,
      mainText: (
        <>
          도서관 출석,{'\n'}
          <Text style={SlidesStyles.highlight}>잔디</Text>처럼 쌓이는 성취감!
        </>
      ),
      subText: SLIDES.ONE.SUB_TEXT,
      additionalElements: (
        <>
          <Image
            source={ILLUSTRATIONS.INTRO}
            style={SlidesStyles.slideImage}
            alt={SLIDES.ONE.KEY}
          />
        </>
      ),
    },
    {
      key: SLIDES.TWO.KEY,
      mainText: (
        <>
          함께 인증하고, {'\n'}함께 성장하는 {'\n'}
          <Text style={SlidesStyles.highlight}>도서관 출석 스터디</Text>
        </>
      ),
      subText: SLIDES.TWO.SUB_TEXT,
      additionalElements: (
        <>
          <Image
            source={ILLUSTRATIONS.INTRO_TWO}
            style={SlidesStyles.slideImage}
            alt={SLIDES.TWO.KEY}
          />
        </>
      ),
    },
    {
      key: SLIDES.THREE.KEY,
      mainText: (
        <>
          출석도 게임처럼! {'\n'}
          <Text style={SlidesStyles.highlight}>티어</Text>와{' '}
          <Text style={SlidesStyles.highlight}>레이팅</Text>으로 {'\n'}즐겁게
          도전하세요!
        </>
      ),
      subText: SLIDES.THREE.SUB_TEXT,
      additionalElements: (
        <>
          <Image
            source={ILLUSTRATIONS.INTRO_THREE}
            style={SlidesStyles.slideImage}
            alt={SLIDES.THREE.KEY}
          />
        </>
      ),
    },
    {
      key: SLIDES.FOUR.KEY,
      mainText: (
        <>
          매일 <Text style={SlidesStyles.highlight}>잔디</Text>를 심으며, {'\n'}
          함께 목표를 {'\n'}이루는 스터디!
        </>
      ),
      subText: SLIDES.FOUR.SUB_TEXT,
      additionalElements: (
        <>
          <Image
            source={ILLUSTRATIONS.INTRO_FOUR}
            style={SlidesStyles.slideImage}
            alt={SLIDES.FOUR.KEY}
          />
        </>
      ),
    },
  ];

  const {scrollX, scrollViewRef, handleScrollEnd} = useSlide(slides);

  const renderSlide = ({item, index}: any) => (
    <Box style={SlidesStyles.slide} key={index}>
      <Text style={SlidesStyles.mainText}>{item.mainText}</Text>
      <Text style={SlidesStyles.subText}>{item.subText}</Text>
      {item.additionalElements}
    </Box>
  );

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

      <Box style={SlidesStyles.paginationContainer}>
        {slides.map((_, i) => {
          let opacity = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View key={i} style={[SlidesStyles.dot, {opacity}]} />
          );
        })}
      </Box>
    </>
  );
};

export default Slides;
