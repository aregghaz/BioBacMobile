import React, {ReactNode} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  View,
  ActivityIndicator,
} from 'react-native';
import {Colors, FontSizes} from '../../theme';
import { FontFamily } from '../../theme';

type Props = {
  dark?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
  onHandler: () => void;
  icon?: ReactNode; // Added icon prop
  disabled?: boolean;
  showArrow?: boolean;
  arrowColor?: string;
  countdown?: boolean; // enable 3-2-1 countdown on press
  countdownStart?: number; // defaults to 3
  loading?: boolean;
};

const Botton = (props: Props) => {

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={props.disabled}
      onPress={()=>props.onHandler()}
      style={[
        styles.container,
        props.style,
      ]}>
      <View style={styles.contentContainer}>
        {props.loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text
            style={[
              {fontFamily: FontFamily.semiBold},
              {fontSize: FontSizes.medium},
              props.textStyle,
              styles.title
            ]}>
            {props.title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default Botton;
const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 54,
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 12,
    backgroundColor: Colors.blue,
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
  },

});

