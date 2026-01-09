import { historyProps, HomeListProps } from '@/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const HomeStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  Tabs: undefined;
  Home: undefined;
  Buyers: {item: HomeListProps};
  Seller: {item: HomeListProps};
  History: {item: historyProps};
  HistoryBuyers: {item: historyProps};
  Payment: undefined;
  Settings: undefined;
};

export type TabParamList = {
  HomeScreen: undefined;
  SettingsScreen: undefined;
};



