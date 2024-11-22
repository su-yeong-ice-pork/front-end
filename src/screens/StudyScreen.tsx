import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import StudyList from '../components/StudyList';
import BottomBar from '../components/BottomBar/index';
import Header from '../components/Header';

const {width} = Dimensions.get('window');

const StudyScreen = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header Title={'스터디'} />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.main}>
            <View style={styles.headerSection}>
              <Text style={styles.title}>
                현재,{'\n'}
                내가 소속된 <Text style={styles.highlight}>스터디</Text>
              </Text>
              <Image
                source={require('../../assets/images/icons/pencil.png')}
                style={styles.headerImage}
                resizeMode="contain"
              />
            </View>
            <StudyList />
          </ScrollView>
        </View>
      </SafeAreaView>
      <BottomBar />
    </>
  );
};

export default StudyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E6E8',
    alignItems: 'center',
  },
  main: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: width - 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    lineHeight: 32,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  highlight: {
    color: '#14b8a6',
  },
  headerImage: {
    width: 30,
    height: 30,
    marginRight: 150,
  },
});
