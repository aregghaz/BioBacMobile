import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {Platform, Pressable} from 'react-native';
import { MaterialIcons, AntDesign, Feather} from '@/component/icons/VectorIcon';

import type {RootStackParamList, TabParamList, SellerParamList} from './types';
//-------------Home----------------
import Home from '@/screen/Home';

//-------------Buyers----------------
import Buyers from '@/screen/Buyers';
import HistoryBuyers from '@/screen/Buyers/HistoryBuyers';

//-------------Seller----------------
import Seller from '@/screen/Seller';
import History from '@/screen/Seller/History';
import SellerCreate from '@/screen/Seller/Create';
//-------------Settings----------------
import Settings from '@/screen/Settings';

//-------------Payment----------------
import Payment from '@/screen/payment';
import PaymentHistory from '@/screen/payment/PaymentHistory';


//-------------Draft----------------
import Draft from '@/screen/Draft';

import { deviceHeight } from '@/helper';
import { FontFamily } from '@/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<RootStackParamList>();
const SettingsStack = createNativeStackNavigator<RootStackParamList>();
const DraftStack = createNativeStackNavigator<RootStackParamList>();
const SellerStack = createNativeStackNavigator<SellerParamList>();


const baseScreenOptions = {
  headerShown: false,
  lazy: true,
  tabBarShowLabel: false,
  tabBarStyle: {
    height: Platform.OS === 'android' ? deviceHeight * 0.06 : deviceHeight * 0.05,
    paddingTop:Platform.OS === 'android' ? 6 : 10,
  },
  textStyle: {
    fontSize: Platform.OS === 'android' ? 16 : 10,
    fontWeight: 'bold',
    fontFamily: FontFamily.regular,
  },
} as const;

function NoFeedbackTabBarButton({
  onPress,
  onLongPress,
  accessibilityState,
  accessibilityLabel,
  testID,
  style,
  children,
}: BottomTabBarButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={style}
      android_ripple={{color: 'transparent'}}
    >
      {children}
    </Pressable>
  );
}

function TabBarIcon({
  routeName,
  color,
  size,
  focused,
}: {
  routeName: keyof TabParamList;
  color: string;
  size: number;
  focused: boolean;
}) {
  if (routeName === 'HomeScreen') {
    return <AntDesign name="home" size={size} color={color} />;
  }
  if (routeName === 'DraftScreen') {
    return <MaterialIcons name="access-time" size={size} color={color} />;
  }
  // Settings tab (Ionicons)
  return (
    <Feather
      name={focused ? 'settings' : 'settings'}
      size={28}
      color={color}
    />
  );
}

const screenOptions = ({route}: {route: {name: keyof TabParamList}}) => ({
  ...baseScreenOptions,
  tabBarButton: (props: BottomTabBarButtonProps) => (
    <NoFeedbackTabBarButton {...props} />
  ),
  tabBarIcon: (props: {color: string; size: number; focused: boolean}) => (
    <TabBarIcon routeName={route.name} {...props} size={30}/>
  ),
});


const SellerStackScreen = () => {
  return (
    <SellerStack.Navigator screenOptions={{headerShown: false}}>
      <SellerStack.Screen name="Seller" component={Seller} />
      <SellerStack.Screen name="History" component={History} />
      <SellerStack.Screen name="SellerCreate" component={SellerCreate} />
    </SellerStack.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Buyers" component={Buyers} />
      <HomeStack.Screen name="SellerStack" component={SellerStackScreen} />
      <HomeStack.Screen name="HistoryBuyers" component={HistoryBuyers} />
      <HomeStack.Screen name="Payment" component={Payment} />
      <HomeStack.Screen name="PaymentHistory" component={PaymentHistory} />
    </HomeStack.Navigator>
  );
};




const DraftStackScreen = () => {
  return (
    <DraftStack.Navigator screenOptions={{headerShown: false}}>
      <DraftStack.Screen name="Draft" component={Draft} />
    </DraftStack.Navigator>
  );
};



const SettingStackScreen = () => {
  return (
    <SettingsStack.Navigator screenOptions={{headerShown: false}}>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
};


export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}>
      <Tab.Screen name="HomeScreen" component={HomeStackScreen} />
      <Tab.Screen name="DraftScreen" component={DraftStackScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingStackScreen} />
    </Tab.Navigator>
  );
}
