import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  SignUp: undefined;
  Study: undefined;
  StudyDetail: {id: number};
  RandomStudyDetail:{id: number};
  Alarm: undefined;
  Home: undefined;
  Log: undefined;
  FindPassword: undefined;
  Profile: undefined;
  EditProfile: undefined;
  FriendsProfile: undefined;
  CreateStudy: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type RootStackRouteProp<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
