import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {Platform, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import type {RootStackParamList, TabParamList} from './types';
//-------------Home----------------
import Home from '@/screen/Home';
import Buyers from '@/screen/Buyers';
import Seller from '@/screen/Seller';
import { deviceHeight } from '@/helper';
import { FontFamily } from '@/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<RootStackParamList>();

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
  const name =
    routeName === 'HomeScreen'
      ? focused
        ? 'home'
        : 'home'
      : focused
      ? 'settings'
      : 'settings-outline';
  return <AntDesign name={name} size={size} color={color} />;
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

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Buyers" component={Buyers} />
      <HomeStack.Screen name="Seller" component={Seller} />
    </HomeStack.Navigator>
  );
}

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}>
      <Tab.Screen name="HomeScreen" component={HomeStackScreen} />
    </Tab.Navigator>
  );
}
