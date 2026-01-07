import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LocalState {
  language: string;
  setLanguage: (value: string) => void;
  clear: () => void;
}

const useLocalStore = create<LocalState>()(
  persist(
    (set) => ({
      language: 'RU',
      setLanguage: (value: string) => {
        set({ language: value });
      },
      clear: () => {
        set({ language: 'RU' });
      },
    }),
    {
      name: 'local-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useLocalStore;
