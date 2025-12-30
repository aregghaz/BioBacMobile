import { View, ActivityIndicator } from 'react-native'
import { deviceHeight } from '@/helper/Dimensions'
import { Colors } from '@/theme'

export default function Activity() {
  return (
    <View style={{marginTop: deviceHeight / 2.5}}>
        <ActivityIndicator size="large" color={Colors.blue} />
    </View>
  )
}