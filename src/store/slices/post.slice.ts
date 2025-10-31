import type { StateCreator } from "zustand";
import { axiosInstance } from "@/api";
import { tryCatchWrapper } from "@/assets/js/tryCatchWrapper";
import { toast } from "react-toastify";

export interface Post {
  _id: string;
  media: Array<string>;
  author: {
    _id: string;
    name: string;
    profilePicture?: string;
  };
  originalPost?: Post;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  sharesData: Array<string>;
  sharesCount: number;
  likesData: Array<string>;
  likesCount: number;
}
export interface PostSlice {
  posts: Post[];
  postLoading: boolean;
  pagination: {
    currentPage?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    limit?: number;
    total?: number;
    totalPages?: number;
  };

  reset: () => void;

  createPost: (
    content: string,
    images?: File[],
    onSuccess?: () => void
  ) => Promise<void>;

  getPosts: (
    parameters: Object,
    append?: boolean,
    onSuccess?: () => void
  ) => Promise<void>;

  toggleLike: (postId: string, userId: string) => Promise<void>;

  deletePost: (postId: string) => Promise<void>;
}

export const createPostSlice: StateCreator<PostSlice> = (set, get) => ({
  posts: [],
  pagination: {},
  postLoading: false,

  reset: () => {
    set({ posts: [] });
  },

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
      (data) => {
        set((state) => ({
          posts: [data.data, ...state.posts],
        }));
        toast.success(data.message);
        onSuccess?.();
      }
    ).finally(() => {
      set({ postLoading: false });
    });
  },

  getPosts: async (parameters, append = false, onSuccess) => {
    set({ postLoading: true });

    await tryCatchWrapper(
      async () => {
        const res = await axiosInstance.get("/post", {
          params: parameters,
        });
        return res.data;
      },
      (data) => {
        set((state) => ({
          posts: append ? [...state.posts, ...data.data.data] : data.data.data,
          pagination: data.data.pagination,
          postLoading: false,
        }));
        onSuccess?.();
      }
    ).finally(() => {
      set({ postLoading: false });
    });
  },

  toggleLike: async (postId, userId) => {
    set((state) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === postId) {
          const isLiked = post.likesData.includes(userId);
          return {
            ...post,
            likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
            likesData: isLiked
              ? post.likesData.filter((id) => id !== userId)
              : [...post.likesData, userId],
          };
        }
        return post;
      });
      return { posts: updatedPosts };
    });

    await tryCatchWrapper(
      async () => {
        await axiosInstance.post(`/post/like-post/${postId}`, {});
      },
      () => {},
      () => {
        set((state) => {
          const updatedPosts = state.posts.map((post) => {
            if (post._id === postId) {
              const isLiked = post.likesData.includes(userId);
              return {
                ...post,
                likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
                likesData: isLiked
                  ? post.likesData.filter((id) => id !== userId)
                  : [...post.likesData, userId],
              };
            }
            return post;
          });
          return { posts: updatedPosts };
        });
      }
    );
  },

  deletePost: async (postId: string) => {
    const previousPosts = get().posts;
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== postId),
    }));

    await tryCatchWrapper(
      async () => {
        const res = await axiosInstance.delete(`/post/${postId}`);
        return res.data;
      },
      (data) => {
        toast.success(data.message);
      },
      () => {
        set({ posts: previousPosts });
        toast.error("Failed to delete post!");
      }
    );
  },
});
