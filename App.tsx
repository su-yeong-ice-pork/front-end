import React, {useEffect} from 'react';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from './src/screens/LandingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import StudyScreen from './src/screens/StudyScreen';
import StudyDetailScreen from './src/screens/StudyDetailScreen';
import AlarmScreen from './src/screens/AlarmScreen';
import HomeScreen from './src/screens/HomeScreen';
import StudyRecordScreen from './src/screens/StudyRecordScreen';
import FindPassword from './src/screens/FindPasswordScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import FriendsProfile from './src/screens/FriendsProfile';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); //스플래시 활성화 시간
  });
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Study" component={StudyScreen} />
          <Stack.Screen name="StudyDetail" component={StudyDetailScreen} />
          <Stack.Screen name="Alarm" component={AlarmScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Log" component={StudyRecordScreen} />
          <Stack.Screen name="FindPassword" component={FindPassword} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="FriendsProfile" component={FriendsProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
