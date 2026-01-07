import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/theme';
import Button from '../button';
import {AntDesign} from '@/component/icons/VectorIcon';
import FilterIcon from '@/component/icons/FilterIcon';
import {t} from '@/locales';
export default function Filter() {
  return (
    <View style={styles.buttonContainer}>
    <Button
      title={t('common.Filter')}
      icon={<FilterIcon size={24} color={Colors.gray_400} />}
      onHandler={() => console.log()}
      textStyle={{color: Colors.gray_400}}
      style={styles.filterButton}
    />
    <Button
      titleIcon={
        <AntDesign name="plus" size={24} color={Colors.white} />
      }
      onHandler={() => console.log()}
      style={styles.button}
    />
  </View>
  )
}

const styles = StyleSheet.create({
    button: {
        width: '15%',
      },
      filterButton: {
        width: '30%',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gray_200,
      },
      buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 10,
        gap: 10,
        width: '93%',
        alignSelf: 'center',
      },
});