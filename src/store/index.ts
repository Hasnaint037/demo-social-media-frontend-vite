import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createAuthSlice, type AuthSlice } from "./slices/auth.slice";
import { createUserSlice, type UserSlice } from "./slices/user.slice";

type RootState = AuthSlice & UserSlice;

export const useStore = create<RootState>()(
  persist(
    devtools((...a) => ({
      ...createAuthSlice(...a),
      ...createUserSlice(...a),
    })),
    {
      name: "app-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
