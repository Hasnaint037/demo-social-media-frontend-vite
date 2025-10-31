import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useStore } from "@/store";
import CreatePost from "@/pages/post/components/CreatePost";
import PostCard from "@/pages/post/components/PostCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const Home = () => {
  const [page, setPage] = useState(1);

  const { getPosts, loading, posts, pagination, reset } = useStore(
    useShallow((store) => ({
      getPosts: store.getPosts,
      loading: store.postLoading,
      posts: store.posts,
      pagination: store.pagination,
      reset: store.reset,
    }))
  );

  useEffect(() => {
    if (page === 1) {
      reset();
      getPosts({ page: 1, limit: 10 });
    } else {
      getPosts({ page, limit: 10 }, true);
    }
  }, [page]);

  const { lastElementRef } = useInfiniteScroll({
    loading,
    hasNextPage: pagination?.hasNextPage ?? false,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Welcome to your Feed 👋
      </h1>

      <CreatePost />

      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        Discover what people are sharing and stay connected with the latest
        posts.
      </p>

      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <div ref={lastElementRef} key={post._id}>
              <PostCard post={post} canShare={true} />
            </div>
          );
        }
        return <PostCard key={post._id} post={post} canShare={true} />;
      })}

      {loading && (
        <p className="text-center py-4 text-gray-500 dark:text-gray-400">
          Loading more posts...
        </p>
      )}

      {!pagination?.hasNextPage && !loading && posts.length > 0 && (
        <p className="text-center py-4 text-gray-500 dark:text-gray-400">
          No More Posts
        </p>
      )}
    </div>
  );
};

export default Home;
