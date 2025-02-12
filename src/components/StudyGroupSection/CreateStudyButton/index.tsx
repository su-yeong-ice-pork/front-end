import React from 'react';

import {ICONS} from '@/src/constants/image/icons';

import {Image} from '@/components/ui/image';
import {TouchableOpacity} from 'react-native';
import {CreateStudyButtonStyles} from './CreateStudyButtonStyles.ts';
import {useNavigation} from '@react-navigation/native';

const CreateStudyButton = () => {
  const navigation = useNavigation();

  const navigateTo = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <TouchableOpacity onPress={() => navigateTo('CreateStudy')}>
      <Image
        source={ICONS.CREATE_STUDY}
        style={CreateStudyButtonStyles.button}
      />
    </TouchableOpacity>
  );
};

export default CreateStudyButton;
