import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '@/theme/Colors';
import {FontFamily} from '@/theme';
import useSplash from '@/hooks/useSplash';
export default function Splash() {
  useSplash();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontFamily: FontFamily.regular}]}>BioBac</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    fontSize:40,
    color: Colors.black,
  },
});
