import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DropdownOptions} from '@/navigation/types';

interface CompanyGroupState {
  companyGroup: DropdownOptions[];
  setCompanyGroup: (value: DropdownOptions[]) => void;
  clear: () => void;
}

const useCompanyGroupStore = create<CompanyGroupState>()(
  persist(
    set => ({
      companyGroup: [],
      setCompanyGroup: (value: DropdownOptions[]) => {
        set({companyGroup: value});
      },
      clear: () => {
        set({companyGroup: []});
      },
    }),
    {
      name: 'company-group-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useCompanyGroupStore;
