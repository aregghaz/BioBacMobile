import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '@/theme/Colors';
import {FontFamily} from '@/theme';
import useSplash from '@/hooks/useSplash';
import { deviceHeight } from '@/helper/Dimensions';
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
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    fontSize:40,
    color: Colors.black,
    marginTop: deviceHeight / 2.5,
  },
});
