import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '@/theme/Colors';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.black,
    fontSize: 18,
  },
});




