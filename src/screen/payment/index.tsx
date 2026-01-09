import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/theme';
import Header from '@/navigation/Header';
import { t } from '@/locales';
import DropdownComponent from '@/component/dropdown';
export default function Payment() {
  return (
    <View style={styles.container}>
      <Header title={t('payment.title')} showBack={true} />
      <DropdownComponent/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});