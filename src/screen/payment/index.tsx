import { View,StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/theme';
import Header from '@/navigation/Header';
import { t } from '@/locales';
import DropdownComponent from '@/component/dropdown';
import Calender from '@/component/calender';
export default function Payment() {
  return (
    <View style={styles.container}>
      <Header title={t('payment.title')} showBack={true} />
      <DropdownComponent/>
      <Calender/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});