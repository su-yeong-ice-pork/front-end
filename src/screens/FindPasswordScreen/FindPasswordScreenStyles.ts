import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
export const FindPasswordStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    paddingHorizontal: width * 0.05,
    backgroundColor: '#F5F5F5',
  },
});
