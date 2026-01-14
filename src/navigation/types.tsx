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
  PaymentHistory: undefined;
  Draft: undefined;
};

export type TabParamList = {
  HomeScreen: undefined;
  SettingsScreen: undefined;
  DraftScreen: undefined;
};


export type DraftParamList = {
  accountId: number,
  category: string,
  date: string;
  notes: string,
  paymentCategoryId: number,
  sum: number,
  targetId: number,
};
