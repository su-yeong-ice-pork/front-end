import {StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

export const DateModalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: `${FONT}`,
    color: '#000000',
  },
  modalDesc: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: '700',
    fontFamily: `${FONT}`,
    color: '#000000',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1AA5AA',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: `${FONT}`,
  },
});
