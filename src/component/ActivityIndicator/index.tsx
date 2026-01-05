import {ActivityIndicator, StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native';
import {deviceHeight} from '@/helper/Dimensions';
import {Colors} from '@/theme';

export default function Activity({style}: {style?: StyleProp<ViewStyle>}) {
  return (
    <View style={[styles.container, style]}>
        <ActivityIndicator size="large" color={Colors.blue} />
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      marginTop: deviceHeight / 2.5,
    },
  });
