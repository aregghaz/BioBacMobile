import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Alert, BackHandler} from 'react-native';

// Exit app on Android hardware back (use inside a screen)
export default function useExitAppOnBack() {
  useFocusEffect(
    useCallback(() => {

      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            {text: 'No', style: 'cancel'},
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: true},
        );
        return true;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );
}
