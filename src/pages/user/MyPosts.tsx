import { useEffect, useState, useRef, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { useStore } from "@/store";
import CreatePost from "@/components/common/CreatePost";
import PostCard from "@/components/common/PostCard";

const MyPosts = () => {
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { user, getPosts, posts, loading, pagination, reset } = useStore(
    useShallow((state) => ({
      user: state.user,
      posts: state.posts,
      getPosts: state.getPosts,
      loading: state.postLoading,
      pagination: state.pagination,
      reset: state.reset,
    }))
  );

  useEffect(() => {
    if (user?._id) {
      reset();
      getPosts({ userId: user._id, page: 1, limit: 10 });
    }
  }, [user?._id]);

  useEffect(() => {
    if (page > 1 && user?._id) {
      getPosts({ userId: user._id, page, limit: 10 }, true);
    }
  }, [page, user?._id]);

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pagination?.hasNextPage) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, pagination]
  );

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <CreatePost />

      {posts.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-8">
          You haven’t created any posts yet.
        </p>
      )}

      {posts.map((post, index) =>
        index === posts.length - 1 ? (
          <div ref={lastPostRef} key={post._id}>
            <PostCard post={post} canShare canDelete />
          </div>
        ) : (
          <PostCard key={post._id} post={post} canShare canDelete />
        )
      )}

      {loading && (
        <p className="text-center py-4 text-gray-500 dark:text-gray-400">
          Loading more posts...
        </p>
      )}

      {!pagination?.hasNextPage && !loading && posts.length > 0 && (
        <p className="text-center py-4 text-gray-500 dark:text-gray-400">
          You’ve reached the end 🎉
        </p>
      )}
    </div>
  );
};

export default MyPosts;
