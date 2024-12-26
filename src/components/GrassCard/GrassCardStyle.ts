import {StyleSheet} from 'react-native-css-interop';
import {Dimensions} from "react-native";

const {width} = Dimensions.get('window');

export const GrassCardStyles = StyleSheet.create({
    grassCardContainer: {
        paddingHorizontal: width * 0.05,
        display: 'flex',
    },
    cardSet: {
        justifyContent: 'space-around',
    }
});