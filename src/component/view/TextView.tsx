import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, FontFamily, FontSizes } from '@/theme';

export default function TextView() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TextView</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:'93%'
  },
  text: {
    fontSize: FontSizes.medium,
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
  },
});