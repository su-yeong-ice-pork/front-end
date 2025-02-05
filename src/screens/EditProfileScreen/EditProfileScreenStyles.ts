import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';
export const EditProfileScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.BACK_GROUND,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    backgroundColor: COLOR.BACK_GROUND,
    justifyContent: 'space-between',
  },
  titleContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: COLOR.BACK_GROUND,
  },
  titleText: {
    fontSize: 27,
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: COLOR.BACK_GROUND,
  },
  buttonContainer: {
    backgroundColor: COLOR.BACK_GROUND,
    alignItems: 'center',
    paddingVertical: height * 0.02,
  },

  buttonText: {
    color: COLOR.WHITE,
    fontSize: 16,
  },
  imageListContainer: {
    position: 'relative',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  inputLabel: {
    fontFamily: `${FONT}`,
    fontSize: 14,
    color: '#454545',
    marginBottom: height * 0.005,
  },
  starmark: {
    color: '#FF7360',
  },
});
