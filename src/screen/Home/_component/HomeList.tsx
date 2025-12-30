import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '@/theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {FontFamily, FontSizes, Shadows} from '@/theme';
import {HomeListProps} from '@/types';

export default function HomeList({
  item,
  onCallback,
}: {
  item: HomeListProps;
  onCallback: (item: HomeListProps) => void;
}) {
  const Icon =
    item?.iconLibrary === 'Ionicons'
      ? Ionicons
      : item?.iconLibrary === 'MaterialIcons'
      ? MaterialIcons
      : item?.iconLibrary === 'Feather'
      ? Feather
      : AntDesign;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onCallback(item)}
      style={styles.groupRow}>
      <Icon
        name={item.iconName ?? item.icon}
        size={item.iconSize ?? 40}
        color={Colors.black}
      />
      <Text style={styles.groupTitle}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionTitleSpaced: {
    marginTop: 16,
  },
  groupRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    gap: 10,
    height: 100,
    ...Shadows.md,
  },
  groupTitle: {
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.small,
  },
});
