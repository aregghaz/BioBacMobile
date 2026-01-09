import {Text, StyleSheet, ViewStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSizes, Shadows} from '@/theme';
import {MaterialIcons} from '../icons/VectorIcon';

interface TouchableViewProps {
  title: string;
  style?: ViewStyle;
  onClose?: () => void;
  onPress?: () => void;
  disabled?: boolean;
}

export default function TouchableView({
  title,
  style,
  onClose,
  onPress,
  disabled = false,
}: TouchableViewProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text,{color:title ? Colors.black : Colors.gray}]}>{title || 'Select'}</Text>

      {disabled && (
        <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
          <MaterialIcons name="close" size={22} color="black" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '93%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray_200,
    borderRadius: 12,
    ...Shadows.md,
    height: 50,
  },
  text: {
    fontSize: FontSizes.medium,
    fontFamily: FontFamily.regular,
    color: Colors.black,
  },
});
