import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthState = Tokens & {
  setTokens: (tokens: {accessToken: string; refreshToken: string}) => void;
  clear: () => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,

      setTokens: ({accessToken, refreshToken}) => set({accessToken, refreshToken}),
      clear: () => set({accessToken: null, refreshToken: null}),

      getAccessToken: () => get().accessToken,
      getRefreshToken: () => get().refreshToken,
    }),
    {
      name: 'auth.tokens',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);

