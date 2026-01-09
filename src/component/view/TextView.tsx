import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { Colors, FontFamily, FontSizes } from '@/theme';

interface TextViewProps {
    title: string;
  style?: ViewStyle
}

export default function TextView({title, style}: TextViewProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:'90%',
    alignSelf: 'center',
  },
  text: {
    fontSize: FontSizes.medium,
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
  },
});