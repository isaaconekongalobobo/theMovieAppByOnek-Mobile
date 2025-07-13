import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserConnectedStore } from 'types/allType';

export const useUserConnected = create<UserConnectedStore>()(
  persist(
    (set) => ({
      userConnected: null,
      setUserConnected: (authenticatedUser: User | null) =>
        set({ userConnected: authenticatedUser }),
    }),
    {
      name: 'user-connected-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
