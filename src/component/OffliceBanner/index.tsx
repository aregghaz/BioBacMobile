import { Colors, FontFamily, FontSizes } from '@/theme';
import { StyleSheet, Text, View } from 'react-native';
export function OfflineBanner() {
    return (
      <View style={styles.banner}>
        <Text style={styles.text}>No internet connection</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    banner: {
      height: 30,
      backgroundColor:Colors.red,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: Colors.black,
      fontFamily: FontFamily.semiBold,
      fontSize: FontSizes.medium,
    },
  });
  