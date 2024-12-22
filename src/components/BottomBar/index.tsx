import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {PATH_NAME} from '@/src/constants/BottomBar/Images';
import {LABELS, MESSAGES} from '@/src/constants/BottomBar/Messages';

import BottomBarButton from './BottomBarButton';
import UpcomingModal from '../Modal/UpcomingModal';

import {BottomBarStyles} from './BottomBarStyles';
import {HStack} from '@/components/ui/hstack';

const BottomBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const currentScreen = route.name;

  const navigateTo = (screen: string) => {
    navigation.navigate(screen);
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <HStack style={BottomBarStyles.container}>
      <BottomBarButton
        currentScreen={currentScreen}
        onPress={() => navigateTo(PATH_NAME.LOG)}
        screen={PATH_NAME.LOG}
        label={LABELS.LOG}
      />
      <BottomBarButton
        currentScreen={currentScreen}
        onPress={() => navigateTo(PATH_NAME.STUDY)}
        screen={PATH_NAME.STUDY}
        label={LABELS.STUDY}
      />
      <BottomBarButton
        currentScreen={currentScreen}
        onPress={() => navigateTo(PATH_NAME.HOME)}
        screen={PATH_NAME.HOME}
        label={LABELS.HOME}
      />
      <BottomBarButton
        currentScreen={currentScreen}
        onPress={() => navigateTo(PATH_NAME.ALARM)}
        screen={PATH_NAME.ALARM}
        label={LABELS.ALARM}
      />
      <BottomBarButton
        currentScreen={currentScreen}
        onPress={() => navigateTo(PATH_NAME.FRIENDSPROFILE)}
        screen={PATH_NAME.PROFILE}
        label={LABELS.PROFILE}
      />
      <UpcomingModal
        showModal={modalVisible}
        setShowModal={setModalVisible}
        text={MESSAGES.MODAL}
      />
    </HStack>
  );
};

export default BottomBar;
