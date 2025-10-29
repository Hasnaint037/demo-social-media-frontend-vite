import type { StateCreator } from "zustand";
import { axiosInstance } from "@/api";
import { tryCatchWrapper } from "@/assets/js/tryCatchWrapper";
import { toast } from "react-toastify";

export interface Post {
  content: string;
  images: File[];
}

export interface PostSlice {
  postLoading: boolean;
  createPost: (
    content: string,
    images?: File[],
    onSuccess?: () => void
  ) => Promise<void>;
}

export const createPostSlice: StateCreator<PostSlice> = (set) => ({
  postLoading: false,

  createPost: async (content, images, onSuccess) => {
    set({ postLoading: true });

    await tryCatchWrapper(
      async () => {
        const formData = new FormData();
        formData.append("content", content);

        if (images && images.length > 0) {
          images.forEach((image) => {
            formData.append("images", image);
          });
        }

        const res = await axiosInstance.post("/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return res.data;
      },
      (data: any) => {
        toast.success("Post created successfully!");
        onSuccess?.();
      }
    ).finally(() => {
      set({ postLoading: false });
    });
  },
});
