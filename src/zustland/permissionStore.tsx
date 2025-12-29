import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetAllPermissionsResponse } from '@/types';

interface PermissionState {
  permissions: GetAllPermissionsResponse[];
  setPermissions: (value: GetAllPermissionsResponse[]) => void;
  clear: () => void;
}

const usePermissionStore = create<PermissionState>()(
  persist(
    (set) => ({
      permissions: [],
      setPermissions: (value: GetAllPermissionsResponse[]) => {
        set({ permissions: value });
      },
      clear: () => {
        set({ permissions: [] });
      },
    }),
    {
      name: 'permission-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default usePermissionStore;
