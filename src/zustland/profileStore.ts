import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetProfileResponse } from '@/types';

interface ProfileState {
  profile: GetProfileResponse | null;
  setProfile: (value: GetProfileResponse) => void;
  clear: () => void;
}

const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (value: GetProfileResponse) => {
        set({ profile: value });
      },
      clear: () => {
        set({ profile: null });
      },
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useProfileStore;
