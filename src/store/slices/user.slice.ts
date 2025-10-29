import type { StateCreator } from "zustand";
import { axiosInstance } from "@/api/axiosInstance";
import { tryCatchWrapper } from "@/assets/js/tryCatchWrapper";
import { toast } from "react-toastify";

export interface UserSlice {
  profileLoading: boolean;
  updateProfile: (
    name: string,
    email: string,
    bio: string,
    profilePicture?: File | null,
    onSuccess?: () => void
  ) => Promise<void>;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  profileLoading: false,

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
});
