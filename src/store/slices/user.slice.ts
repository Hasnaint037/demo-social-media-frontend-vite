import type { StateCreator } from "zustand";
import { axiosInstance } from "@/api";
import { tryCatchWrapper } from "@/assets/js/tryCatchWrapper";
import { toast } from "react-toastify";

export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSlice {
  profileLoading: boolean;
  users: User[];
  isFollowingMap: Record<string, boolean>;

  updateProfile: (
    name: string,
    email: string,
    bio: string,
    profilePicture?: File | null,
    onSuccess?: () => void
  ) => Promise<void>;

  searchUser: (query: string) => Promise<void>;
  followUser: (targetUserId: string) => Promise<void>;
  checkIsFollowing: (targetUserId: string) => Promise<void>;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  profileLoading: false,
  users: [],
  isFollowingMap: {},

  updateProfile: async (name, email, bio, profilePicture, onSuccess) => {
    set({ profileLoading: true });

    await tryCatchWrapper(
      async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("bio", bio);

        if (profilePicture) {
          formData.append("profilePicture", profilePicture);
        }

        const res = await axiosInstance.put("/user", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return res.data;
      },
      (data: any) => {
        set((state: any) => ({
          user: {
            ...state.user,
            ...data.data,
          },
          profileLoading: false,
        }));
        toast.success(data.message);
        onSuccess?.();
      }
    ).finally(() => {
      set({ profileLoading: false });
    });
  },

  searchUser: async (query) => {
    set({ profileLoading: true });

    await tryCatchWrapper(
      async () => {
        const res = await axiosInstance.get("/user", {
          params: { name: query },
        });
        return res.data;
      },
      (data: any) => {
        set({ users: data.data });
      }
    ).finally(() => {
      set({ profileLoading: false });
    });
  },

  followUser: async (targetUserId) => {
    await tryCatchWrapper(
      async () => {
        const res = await axiosInstance.post(`user/${targetUserId}`);
        return res.data;
      },
      () => {
        set((state) => ({
          isFollowingMap: {
            ...state.isFollowingMap,
            [targetUserId]: !state.isFollowingMap[targetUserId],
          },
        }));
      }
    );
  },

  checkIsFollowing: async (targetUserId) => {
    await tryCatchWrapper(
      async () => {
        const res = await axiosInstance.get(
          `user/${targetUserId}/is-following`
        );
        return res.data;
      },
      (data: any) => {
        set((state) => ({
          isFollowingMap: {
            ...state.isFollowingMap,
            [targetUserId]: data.isFollowing,
          },
        }));
      }
    );
  },
});
