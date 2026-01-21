import {historyProps, HomeListProps} from '@/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NavigatorScreenParams} from '@react-navigation/native';

export const HomeStack = createNativeStackNavigator<RootStackParamList>();

export type SellerParamList = {
  Seller: {item: HomeListProps};
  History: {item: historyProps};
  SellerCreate: undefined;
};


export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  Tabs: undefined;
  Home: undefined;
  Buyers: {item: HomeListProps};
  HistoryBuyers: {item: historyProps};
  Payment: undefined;
  Settings: undefined;
  PaymentHistory: undefined;
  Draft: undefined;
  SellerStack: NavigatorScreenParams<SellerParamList> | undefined;
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
