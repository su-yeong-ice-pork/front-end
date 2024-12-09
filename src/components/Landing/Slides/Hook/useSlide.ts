import {useRef, useState, useEffect} from 'react';
import {Animated} from 'react-native';
import {width} from '../SlidesStyles';
import {SlidesType} from '@/src/components/types/LandingType/SlidesType';

export const useSlide = (slides: SlidesType[], intervalTime: number = 3000) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
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
    }, intervalTime);

    return () => clearInterval(interval);
  }, [slides.length, intervalTime]);

  const handleScrollEnd = (e: {nativeEvent: {contentOffset: {x: number}}}) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  return {
    scrollX,
    scrollViewRef,
    currentIndex,
    handleScrollEnd,
  };
};
