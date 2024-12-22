import React from 'react';

import {Linking} from 'react-native';

import {Text} from '@/components/ui/text';

import {FOOTER} from '@/src/constants/Landing/Footer';
import {LandingFooterStyle} from './LandingFooterStyles';

const LandingFooter = () => {
  return (
    <Text
      style={LandingFooterStyle.footerText}
      numberOfLines={1}
      adjustsFontSizeToFit>
      계정 생성 시 잔디의{' '}
      <Text
        style={[LandingFooterStyle.footerText, LandingFooterStyle.underline]}
        onPress={() => Linking.openURL(FOOTER.MESSAGE)}>
        개인정보처리방침
      </Text>{' '}
      및 이용약관에 동의하게 됩니다.
    </Text>
  );
};

export default LandingFooter;
