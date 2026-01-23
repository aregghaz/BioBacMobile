import {NativeModules, Platform} from 'react-native';
 
type GpsEnablerNative = {
  isEnabled: () => Promise<boolean>;
  promptEnable: () => Promise<boolean>;
};

const Native: GpsEnablerNative | undefined = (NativeModules as any)?.GpsEnabler;

export async function isGpsEnabled(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;
  if (!Native?.isEnabled) return false;
  return Native.isEnabled();
}

/**
 * Android: shows the system dialog to enable Location services (GPS) if possible.
 * iOS: cannot show system GPS enable dialog; return true and let caller open settings if needed.
 */
export async function promptEnableGps(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;
  if (!Native?.promptEnable) return false;
  return Native.promptEnable();
}

