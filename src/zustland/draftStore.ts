import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DraftState {
  Draft:any[];
  setDraft: (value:any[]) => void;
  clear: () => void;
}

const useDraftStore = create<DraftState>()(
  persist(
    set => ({
      Draft: [],
      setDraft: (value: any[]) => {
        set({Draft: value});
      },
      clear: () => {
        set({Draft: []});
      },
    }),
    {
      name: 'draft-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useDraftStore;
