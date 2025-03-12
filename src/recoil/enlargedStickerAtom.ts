import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const enlargedStickersAtom = atom<string[]>({
  key: 'enlargedStickersAtom',
  default: [],
});

const {persistAtom} = recoilPersist({
  key: 'stickerRequestCount',
  storage: AsyncStorage,
});

export const stickerRequestCountAtom = atom<number>({
  key: 'stickerRequestCountAtom',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const messageRequestCountAtom = atom<number>({
  key: 'messageRequestCountAtom',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
