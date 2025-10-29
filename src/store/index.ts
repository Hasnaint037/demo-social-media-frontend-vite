import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createAuthSlice, type AuthSlice } from "./slices/auth.slice";

type RootState = AuthSlice;

export const useStore = create<RootState>()(
  persist(
    devtools((...a) => ({
      ...createAuthSlice(...a),
    })),
    {
      name: "app-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
