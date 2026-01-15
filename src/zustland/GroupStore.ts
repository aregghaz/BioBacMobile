import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HomeListProps } from '@/types';

interface GroupState {
  groupsStore: HomeListProps[];
  setGroupsStore: (value: HomeListProps[]) => void;
  clear: () => void;
}

const useGroupStore = create<GroupState>()(
  persist(
    (set) => ({
      groupsStore: [],
      setGroupsStore: (value: HomeListProps[]) => {
        set({ groupsStore: value });
      },
      clear: () => {
        set({ groupsStore: [] });
      },
    }),
    {
      name: 'permission-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useGroupStore;
