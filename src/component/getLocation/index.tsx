import {Alert, Linking, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {promptEnableGps} from '@/native/gpsEnabler';

export async function ensureLocationPermission(): Promise<boolean> {
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  const status = await check(permission);

  if (status === RESULTS.GRANTED) return true;

  if (status === RESULTS.DENIED) {
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  }

  return false; // BLOCKED / UNAVAILABLE
}


export function getSafeCurrentLocation(
  onSuccess: (coords: {latitude: number; longitude: number; accuracy?: number}) => void,
  onError?: (e: unknown) => void,
) {
  Geolocation.getCurrentPosition(
    pos => {
      onSuccess({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      });
    },
    err => {
      /**
       * code === 2  → GPS خاموش یا provider در دسترس نیست
       * (روی بعضی deviceها تنها راه تشخیص همینه)
       */
      if (Platform.OS === 'android' && err.code === 2) {
        // First: show the real system dialog (Google Play Services resolution UI)
        promptEnableGps()
          .then(enabled => {
            if (enabled) {
              // Retry once after user enables GPS
              Geolocation.getCurrentPosition(
                pos => {
                  onSuccess({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                  });
                },
                retryErr => onError?.(retryErr),
                {
                  enableHighAccuracy: true,
                  timeout: 15000,
                  maximumAge: 10000,
                },
              );
              return;
            }

            // Fallback: open Location settings screen
            Alert.alert(
              'Location is off',
              'لطفاً Location (GPS) دستگاه را روشن کنید',
              [
                {text: 'لغو', style: 'cancel'},
                {
                  text: 'تنظیمات',
                  onPress: () => Linking.sendIntent?.('android.settings.LOCATION_SOURCE_SETTINGS'),
                },
              ],
            );
          })
          .catch(e => onError?.(e));
        return;
      }

      onError?.(err);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    },
  );
}
