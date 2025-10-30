import { useState, useEffect, useRef, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { useStore } from "@/store";
import PostCard from "../post/components/PostCard";

const FeedPage = () => {
  const [filter, setFilter] = useState<
    "following" | "mostLiked" | "mostShared"
  >("following");
  const [page, setPage] = useState(1);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const { getPosts, posts, loading, pagination, reset } = useStore(
    useShallow((store) => ({
      getPosts: store.getPosts,
      posts: store.posts,
      loading: store.postLoading,
      pagination: store.pagination,
      reset: store.reset,
    }))
  );

  useEffect(() => {
    reset();
    setPage(1);
    const query: any = { page: 1, limit: 10 };
    if (filter === "following") query.isFollowingPosts = "true";
    if (filter === "mostLiked") query.isMostLikedPosts = "true";
    if (filter === "mostShared") query.isMostSharedPosts = "true";

    getPosts(query);
  }, [filter]);

  useEffect(() => {
    if (page === 1) return;
    const query: any = { page, limit: 10 };
    if (filter === "following") query.isFollowingPosts = "true";
    if (filter === "mostLiked") query.isMostLikedPosts = "true";
    if (filter === "mostShared") query.isMostSharedPosts = "true";

    getPosts(query, true);
  }, [page]);

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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-3">
          Your Feed
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg md:text-xl">
          Stay updated with posts from users you follow and discover trending
          content.
        </p>
      </div>

      <div className="flex gap-4 mb-8 justify-center">
        {["following", "mostLiked", "mostShared"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as typeof filter)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer
              ${
                filter === tab
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {tab === "following"
              ? "Followed Users"
              : tab === "mostLiked"
              ? "Most Liked"
              : "Most Shared"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {posts.length > 0
          ? posts.map((post, index) => {
              if (index === posts.length - 1) {
                return (
                  <div key={post._id} ref={lastPostRef}>
                    <PostCard post={post} canShare />
                  </div>
                );
              }
              return <PostCard key={post._id} post={post} canShare />;
            })
          : !loading && (
              <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                No posts found.
              </p>
            )}

        {loading && (
          <p className="text-center py-4 text-gray-500 dark:text-gray-400 animate-pulse">
            Loading...
          </p>
        )}

        {!pagination?.hasNextPage && posts.length > 0 && !loading && (
          <p className="text-center py-4 text-gray-500 dark:text-gray-400">
            No More Posts
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
