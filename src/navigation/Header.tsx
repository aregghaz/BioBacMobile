// src/components/CustomHeader.js
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '@/theme/Colors';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import {FontFamily, FontSizes} from '@/theme';
type CustomHeaderProps = {
  title?: string;
  showBack?: boolean;
  icon?: React.ReactNode;
  onHandler?: () => void;
  onSubmitBack?: () => void;
  style?: ViewStyle;
};

export default function CustomHeader({
  title,
  showBack = false,
  icon,
  onHandler,
  onSubmitBack,
  style,
}: CustomHeaderProps) {
  const navigation = useNavigation();
  return (
    <View style={[styles.header, style]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <View style={styles.backContainer}>
            <TouchableOpacity
              onPress={onSubmitBack ? onSubmitBack : () => navigation.goBack()}>
              <Arrow name="arrow-back" size={30} color={Colors.black} />
            </TouchableOpacity>
          </View>
        )}
      </View>
        <Text
          style={[styles.title]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {title || ''}
        </Text>
      {/* <TouchableOpacity onPress={onHandler} style={styles.rightContainer}>
        <View>{icon}</View>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    position: 'relative',
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  leftContainer: {
    width: '40%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    color: Colors.black,
    width: '70%',
    fontSize: 20,
    fontFamily: FontFamily.semiBold
  },
});
