import React, {useCallback, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Geolocation, {
  type GeoError,
  type GeoOptions,
  type GeoPosition,
} from 'react-native-geolocation-service';
import Botton from '@/component/button';

export type LocationCoords = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};

type Props = {
  title?: string;
  onLocation: (coords: LocationCoords, raw?: GeoPosition) => void;
  onError?: (error: GeoError | Error) => void;
  options?: GeoOptions;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

async function ensureAndroidLocationPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;

  const fine = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
  const coarse = PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;

  const hasFine = await PermissionsAndroid.check(fine);
  const hasCoarse = await PermissionsAndroid.check(coarse);
  if (hasFine || hasCoarse) return true;

  // Note: requestMultiple doesn't take a rationale object (unlike request()).
  const result = await PermissionsAndroid.requestMultiple([fine, coarse]);

  return (
    result[fine] === PermissionsAndroid.RESULTS.GRANTED ||
    result[coarse] === PermissionsAndroid.RESULTS.GRANTED
  );
}

export default function GetLocationButton({
  title = 'Get location',
  onLocation,
  onError,
  options,
  style,
  disabled,
}: Props) {
  const [loading, setLoading] = useState(false);

  const onPress = useCallback(async () => {
    if (disabled || loading) return;

    try {
      setLoading(true);
      const allowed = await ensureAndroidLocationPermission();
      if (!allowed) {
        throw new Error('Location permission denied');
      }

      Geolocation.getCurrentPosition(
        (pos: GeoPosition) => {
          setLoading(false);
          onLocation(
            {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
            },
            pos,
          );
        },
        (err: GeoError) => {
          setLoading(false);
          onError?.(err);
        },
        {
          enableHighAccuracy: true,
          // Android: if Location (GPS) is OFF, show the system dialog to turn it ON
          showLocationDialog: true,
          forceRequestLocation: true,
          timeout: 15000,
          maximumAge: 10000,
          ...options,
        },
      );
    } catch (e) {
      setLoading(false);
      onError?.(e as Error);
    }
  }, [disabled, loading, onError, onLocation, options]);

  return (
    <Botton
      title={title}
      onHandler={onPress}
      loading={loading}
      disabled={disabled || loading}
      style={style}
    />
  );
}

