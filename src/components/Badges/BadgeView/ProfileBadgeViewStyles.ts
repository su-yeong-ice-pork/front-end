import {StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color.ts';

export const ProfileBadgeViewStyles = StyleSheet.create({
    badge: {
        width: 35,
        height: 35,
        marginRight: 7,
        resizeMode: 'contain',
    },
    badgeStackBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto'
    },
    moreButton: {
        backgroundColor: COLOR.WHITE,
        paddingBottom: 10
    },
    moreText: {
        fontSize: 20,
        color: '#009499',
        fontFamily: `${FONT}`,
    },
});
