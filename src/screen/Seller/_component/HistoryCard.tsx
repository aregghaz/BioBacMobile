import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {getHistoryProps} from '@/types';
import {FontFamily, FontSizes} from '@/theme';
import NotFound from '@/component/icons/NotFound';

export default function HistoryCard({element}: {element: getHistoryProps}) {
  const createdAtDate = element.createdAt.split(':')[0]
  return (
    <View style={styles.container}>
        {!element ?
            <NotFound size={100} /> :
            <>
            <View style={styles.row}>
                <Text style={styles.title}>Amount Changed:</Text>
                <Text style={styles.value}>{element.amountChanged}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Note:</Text>
                <Text style={styles.value}>{element.note}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Action Time:</Text>
                <Text style={styles.value}>{createdAtDate}</Text>
            </View>
            </>
            }
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
