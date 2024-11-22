// src/hooks/useListViewBox.ts
import {useState, useEffect} from 'react';
import {ImageSourcePropType} from 'react-native';
import {ICONS} from '../constants/image/icons';

type ListViewBoxData = {
  boxTitle: string;
  icon: ImageSourcePropType;
  buttonIcon: ImageSourcePropType;
  typeLabel: string;
  buttonText: string;
  description: string;
};

const useListViewBox = (type: 'friend' | 'group'): ListViewBoxData => {
  const [boxTitle, setBoxTitle] = useState<string>('');
  const [icon, setIcon] = useState<ImageSourcePropType>(
    ICONS.COLORED_FRIENDS_ICON,
  );
  const [buttonIcon, setButtonIcon] = useState<ImageSourcePropType>(
    ICONS.FRIENDS_ICON,
  );
  const [typeLabel, setTypeLabel] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (type === 'friend') {
      setBoxTitle('현재 나의 잔디 친구');
      setIcon(ICONS.COLORED_FRIENDS_ICON);
      setButtonIcon(ICONS.FRIENDS_ICON);
      setTypeLabel('명');
      setButtonText('친구목록 보기');
      setDescription('의 잔디 친구들과 공부 중입니다!');
    } else if (type === 'group') {
      setBoxTitle('현재 나의 잔디 스터디 그룹');
      setIcon(ICONS.COLORED_GROUP_ICON);
      setButtonIcon(ICONS.GROUPS_ICON);
      setTypeLabel('개');
      setButtonText('그룹목록 보기');
      setDescription('의 잔디 그룹에서 활동 중입니다!');
    }
  }, [type]);

  return {
    boxTitle,
    icon,
    buttonIcon,
    typeLabel,
    buttonText,
    description,
  };
};

export default useListViewBox;
