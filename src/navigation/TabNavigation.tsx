import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import type {TabParamList} from './types';
import Home from '@/screen/Home';
import Settings from '@/screen/Settings';

const Tab = createBottomTabNavigator<TabParamList>();

const baseScreenOptions = {
  headerShown: false,
  lazy: true,
  tabBarShowLabel: true,
  tabBarStyle: {
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
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
    routeName === 'Home'
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
    <TabBarIcon routeName={route.name} {...props} />
  ),
});

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
