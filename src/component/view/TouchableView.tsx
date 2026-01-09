import {Text, StyleSheet, ViewStyle, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, FontFamily, FontSizes, Shadows} from '@/theme';
import {MaterialIcons} from '../icons/VectorIcon';

interface TouchableViewProps {
  title: string;
  style?: ViewStyle;
  onClose?: () => void;
  onPress?: () => void;
  disabled?: boolean;
  focused?: boolean; // controlled focus (optional)
  onBlur?:boolean
  icon?: React.ReactNode;
}

export default function TouchableView({
  title,
  style,
  onClose,
  onPress,
  focused,
  onBlur,
  icon,
}: TouchableViewProps) {
  const [isFocusedInternal, setIsFocusedInternal] = useState(onBlur);
  const isFocused = focused ?? isFocusedInternal;
  const onHandlerPress = () => {
    setIsFocusedInternal(true);
    onPress?.();
  };
  useEffect(() => {
    setIsFocusedInternal(onBlur ?? false);
  }, [onBlur]);
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        style,
        {borderColor: isFocused ? Colors.blue : Colors.gray_200},
      ]}
      onPress={onHandlerPress}
      >
      <Text style={[styles.text, {color: title ? Colors.black : Colors.gray}]}>
        {title || 'Select'}
      </Text>

      {title ? (
        <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
          <MaterialIcons name="close" size={22} color="black" />
        </TouchableOpacity>
      ) : icon ? (
        icon
      ) : null}
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
