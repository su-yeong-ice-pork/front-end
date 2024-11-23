// src/hooks/useListViewBox.ts
import {useState, useEffect} from 'react';
import {ImageSourcePropType} from 'react-native';
import {ICONS} from '../constants/image/icons';

import {LIST_VIEW_MESSAGE} from '../constants/ListViewBox/ListViewBox';

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
      setBoxTitle(LIST_VIEW_MESSAGE.FRIEND.BOX_TITLE);
      setIcon(ICONS.COLORED_FRIENDS_ICON);
      setButtonIcon(ICONS.FRIENDS_ICON);
      setTypeLabel(LIST_VIEW_MESSAGE.FRIEND.TYPE_LABEL);
      setButtonText(LIST_VIEW_MESSAGE.FRIEND.BUTTON_TEXT);
      setDescription(LIST_VIEW_MESSAGE.FRIEND.DESCRIPTION);
    } else if (type === 'group') {
      setBoxTitle(LIST_VIEW_MESSAGE.GROUP.BOX_TITLE);
      setIcon(ICONS.COLORED_GROUP_ICON);
      setButtonIcon(ICONS.GROUPS_ICON);
      setTypeLabel(LIST_VIEW_MESSAGE.GROUP.TYPE_LABEL);
      setButtonText(LIST_VIEW_MESSAGE.GROUP.BUTTON_TEXT);
      setDescription(LIST_VIEW_MESSAGE.GROUP.DESCRIPTION);
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
