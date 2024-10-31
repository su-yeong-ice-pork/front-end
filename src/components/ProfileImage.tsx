// src/components/ProfileImage.tsx

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface ProfileImageProps {
  profileImage: string;
  title: string;
  name: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  profileImage,
  title,
  name,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: profileImage}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 71,
    height: 71,
    borderRadius: 35.5,
  },
  textContainer: {
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: '#009499',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  name: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
});
