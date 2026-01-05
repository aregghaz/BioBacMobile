import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AllCompanyProps} from '@/types';
import {FontFamily, FontSizes} from '@/theme';

export default function Card({element}: {element: AllCompanyProps}) {
  const createdAtDate = element.createdAt.split(':')[0]
  return (
    <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Name:</Text>
                <Text style={styles.value}>{element.name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Creditor Amount:</Text>
                <Text style={styles.value}>{element.creditorAmount}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Debtor Amount:</Text>
                <Text style={styles.value}>{element.debtorAmount}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Phone Number:</Text>
                <Text style={styles.value}>{element.phones[0]}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Email:</Text>
                <Text style={styles.value}>{element.emails[0]}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Created At:</Text>
                <Text style={styles.value}>{createdAtDate}</Text>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width:'93%',
        alignSelf: 'center',
        paddingVertical:10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:'2%',
    },
    title: {
        fontFamily: FontFamily.semiBold,
        fontSize: FontSizes.medium,
    },
    value: {
        fontFamily: FontFamily.regular,
        fontSize: FontSizes.small,
    },
});
