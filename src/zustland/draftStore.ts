import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DraftParamList} from '@/navigation/types';

interface DraftState {
  PaymentDraft: DraftParamList[];
  setPaymentDraft: (value: DraftParamList[]) => void;
  clear: () => void;
}

const useDraftStore = create<DraftState>()(
  persist(
    set => ({
      PaymentDraft: [],
      setPaymentDraft: (value: DraftParamList[]) => {
        set({PaymentDraft: value});
      },
      clear: () => {
        set({PaymentDraft: []});
      },
    }),
    {
      name: 'draft-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useDraftStore;
