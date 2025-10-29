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

  logout: (onSuccess?: () => void) => Promise<void>;

  forgotPassword: (email: string) => Promise<void>;

  resetPassword: (
    password: string,
    token: string,
    onSuccess: () => void
  ) => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  isLoading: false,

  signup: async (name, email, password, onSuccess) => {
    set({ isLoading: true });

    await tryCatchWrapper(
      async () => {
        const res = await axiosInstance.post("/auth/register", {
          name,
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

  logout: async (onSuccess) => {
    set({ isLoading: true });

    await tryCatchWrapper(
      async () => {
        const res = await axiosInstance.post("/auth/logout");
        return res.data;
      },
      () => {
        set({ user: null, isLoading: false });
        onSuccess?.();
      }
    ).finally(() => {
      set({ isLoading: false });
    });
  },

  forgotPassword: async (email) => {
    set({ isLoading: true });

    await tryCatchWrapper(
      async () => {
        const res = await axiosInstance.post("/auth/forgot-password", {
          email,
        });
        return res.data;
      },
      (data) => {
        set({ isLoading: false });
        toast.success(data.message);
      }
    ).finally(() => {
      set({ isLoading: false });
    });
  },

  resetPassword: async (password, token, onSuccess) => {
    set({ isLoading: true });

    await tryCatchWrapper(
      async () => {
        const res = await axiosInstance.post("/auth/reset-password", {
          password,
          token,
        });
        return res.data;
      },
      (data) => {
        set({ isLoading: false });
        toast.success(data.message);
        onSuccess?.();
      }
    ).finally(() => {
      set({ isLoading: false });
    });
  },
});
