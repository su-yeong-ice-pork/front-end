import EncryptedStorage from 'react-native-encrypted-storage';

export const setItem = async (key: string, value: string) => {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (e) {
    throw e;
  }
};

export const getItem = async (key: string) => {
  try {
    const res = await EncryptedStorage.getItem(key);
    return res || '';
  } catch (e) {
    throw e;
  }
};

export const removeItem = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (e) {
    throw e;
  }
};
