import React from 'react';
import {Dimensions} from 'react-native';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';

const IMAGES = {
  jandi1: require('../../../../assets/images/illustration/jandi1.png'),
  jandi2: require('../../../../assets/images/illustration/jandi2.png'),
};

interface GrassInfoCardProps {
  type: 1 | 2;
  jadiImage: string;
}

const {width, height} = Dimensions.get('window');

const GrassInfoCard: React.FC<GrassInfoCardProps> = ({type, jadiImage}) => {
  return (
    <Box
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: width * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: width * 0.01,
        marginTop: height * 0.01,
        width: width * 0.4,
        height: height * 0.25,
      }}>
      {type === 1 && (
        <Text
          bold="true"
          style={{
            color: '#000',
            fontSize: 12,
            textAlign: 'center',
            marginTop: height * 0.01,
            marginBottom: height * 0.01,
          }}>
          2024년 10월 03일에 시작{'\n'}하여 지금까지 총{' '}
          <Text style={{fontSize: 15, color: '#009499'}}>36</Text>일
        </Text>
      )}
      {type === 2 && (
        <Text
          bold="true"
          style={{
            color: '#000',
            fontSize: 12,
            textAlign: 'center',
            marginTop: height * 0.01,
            marginBottom: height * 0.01,
          }}>
          지금까지{'\n'}총{' '}
          <Text style={{fontSize: 15, color: '#009499'}}>139</Text>시간의 잔디를
          {'\n'}
          심으셨어요!
        </Text>
      )}

      <Image
        style={{
          width: width * 0.4,
          height: width * 0.25,
          resizeMode: 'contain',
        }}
        source={IMAGES[jadiImage]}
        alt="jandi"
      />
    </Box>
  );
};

export default GrassInfoCard;
