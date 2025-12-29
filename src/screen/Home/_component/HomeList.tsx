import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/theme/Colors'

export default function HomeList({item}: {item: any}) {
  return (
    <View style={{width: '80%', height: 100, borderWidth: 1, borderColor: Colors.red,alignSelf:'center'}}>
    <Text style={styles.title}>{item.title}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    fontSize: 18,
  },
});