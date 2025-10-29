import type { StateCreator } from "zustand";
import { axiosInstance } from "@/api/axiosInstance";
import { tryCatchWrapper } from "@/assets/js/tryCatchWrapper";
import { toast } from "react-toastify";

export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  bio?: string;
}

export interface AuthSlice {
  user: User | null;
  isLoading: boolean;
  signup: (
    name: string,
    email: string,
    password: string,
    onSuccess?: () => void
  ) => Promise<void>;
  login: (
    email: string,
    password: string,
    onSuccess?: () => void
  ) => Promise<void>;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  isLoading: false,

  signup: async (name, email, password, onSuccess) => {
    set({ isLoading: true });

    await tryCatchWrapper(
      async () => {
        const res = await axiosInstance.post("/auth/signup", {
          name,
          email,
          password,
        });
        return res.data;
      },
      (data: any) => {
        set({ user: data.user, isLoading: false });
        onSuccess?.();
      }
    ).finally(() => {
      set({ isLoading: false });
    });
  },

  login: async (email, password, onSuccess) => {
    set({ isLoading: true });

    await tryCatchWrapper(
      async () => {
        const res = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        return res.data;
      },
      (data: any) => {
        set({ user: data.data, isLoading: false });
        onSuccess?.();
      }
    ).finally(() => {
      set({ isLoading: false });
    });
  },

  logout: () => {
    set({ user: null });
    toast.success("Logged out successfully 👋");
  },
});
