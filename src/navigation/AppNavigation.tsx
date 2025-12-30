// src/navigation/Navigation.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import type {RootStackParamList} from './types';
const NetInfo = require('@react-native-community/netinfo');

import Splash from '@/screen/Splash';
//-------------Auth----------------
import SignIn from '@/screen/Auth/SignIn';

import Tabs from '@/navigation/TabNavigation';
import { Colors } from '@/theme/Colors';


const Stack = createNativeStackNavigator<RootStackParamList>();

function OfflineBanner() {
  return (
    <View style={offlineStyles.banner}>
      <Text style={offlineStyles.text}>No internet connection</Text>
    </View>
  );
}

export default function AppNavigation() {
  const [isConnected, setIsConnected] = React.useState<boolean | null>(true);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      const connected = state.isConnected && state.isInternetReachable !== false;
      setIsConnected(Boolean(connected));
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        >
        <StatusBar barStyle="dark-content" />
        {isConnected === false && <OfflineBanner />}
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false ,gestureEnabled: false}}>
            <Stack.Screen name="Splash" component={Splash}/>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="Tabs" component={Tabs}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.white
  },
});

const offlineStyles = StyleSheet.create({
  banner: {
    backgroundColor: '#D93025',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
