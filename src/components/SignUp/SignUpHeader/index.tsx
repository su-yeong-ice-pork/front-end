import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Svg, {
  Defs,
  LinearGradient as SVGLinearGradient,
  Stop,
  Text as SvgText,
  TSpan,
} from 'react-native-svg';

import {SignUpHeaderStyles} from './SignUpHeaderStyles';

const {width, height} = Dimensions.get('window');

const SignUpHeader = () => {
  return (
    <View style={SignUpHeaderStyles.container}>
      <Text style={SignUpHeaderStyles.welcomeText}>환영합니다!</Text>
      <View style={SignUpHeaderStyles.inlineText}>
        <Svg height={height * 0.05} width={width * 0.9}>
          <Defs>
            <SVGLinearGradient id="grad1">
              <Stop offset="0%" stopColor="#2CCDE4" stopOpacity="1" />
              <Stop offset="100%" stopColor="#25E798" stopOpacity="1" />
            </SVGLinearGradient>
          </Defs>
          <SvgText
            fontSize="24"
            fontWeight="800"
            x="0"
            y="30%"
            textAnchor="start"
            alignmentBaseline="hanging">
            <TSpan fill="url(#grad1)">당신의 잔디</TSpan>
            <TSpan fill="#3E3E3E">를 함께 심어보아요!</TSpan>
          </SvgText>
        </Svg>
      </View>
    </View>
  );
};

export default SignUpHeader;
