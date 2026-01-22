import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { StyleSheet } from 'react-native';
import { ToastProvider } from './src/component/toast/ToastProvider';
import NetworkListener from './src/component/network/NetworkListener';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.container}> 
      <ToastProvider>
        <NetworkListener />
        <AppNavigation />
      </ToastProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})