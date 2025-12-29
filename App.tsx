import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ToastProvider } from './src/component/toast/ToastProvider';

export default function App() {
  return (
    <SafeAreaView style={styles.container}> 
      <ToastProvider>
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