import React from 'react';
import {Dimensions} from 'react-native';
import Svg, {Line} from 'react-native-svg';

const {height,width} = Dimensions.get('window');
const DashLine = () => {
  return (
    <Svg
      height="2"
      style={{alignSelf: 'center', marginVertical: height * 0.0115, width: width * 0.9}}>
      <Line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke="#DBDBDB"
        strokeWidth="10"
        strokeDasharray="5,5"
      />
    </Svg>
  );
};

export default DashLine;
