import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";
import PostCard from "@/pages/post/components/PostCard";

const UserDetail = () => {
  // const [isFollowing, setIsFollowing] = useState(false);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const location = useLocation();
  const { userId } = useParams();
  const user = location.state?.user; // passed from SearchUser

  const { getPosts, loading, posts, pagination, reset } = useStore(
    useShallow((store) => ({
      getPosts: store.getPosts,
      loading: store.postLoading,
      posts: store.posts,
      pagination: store.pagination,
      reset: store.reset,
    }))
  );

  // ✅ Fetch user's posts on mount
  useEffect(() => {
    if (!userId && !user?._id) return;
    reset();
    getPosts({ page: 1, limit: 10, userId: userId || user._id });
  }, [userId]);

  // ✅ Load more when scrolling
  useEffect(() => {
    if (page > 1) {
      getPosts({ page, limit: 10, userId: userId || user._id }, true);
    }
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
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-6 mb-8 border-b pb-6">
        <Avatar className="w-20 h-20 rounded-full overflow-hidden">
          <AvatarImage
            src={user?.profilePicture}
            alt={user?.name}
            className="w-full h-full object-cover rounded-full"
          />
          <AvatarFallback className="rounded-full bg-gray-200 text-gray-600">
            {user?.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.name}
          </h2>
          <p className="text-gray-500">{user?.email}</p>
          {user?.bio && (
            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
              {user.bio}
            </p>
          )}
        </div>

        {/* <Button
          onClick={() => setIsFollowing((prev) => !prev)}
          variant="outline"
        >
          {isFollowing ? "Following" : "Follow"}
        </Button> */}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Posts</h3>

        {posts.length > 0 ? (
          posts.map((post, index) => {
            if (index === posts.length - 1) {
              return (
                <div ref={lastPostRef} key={post._id}>
                  <PostCard post={post} canShare={true} />
                </div>
              );
            }
            return <PostCard key={post._id} post={post} canShare={true} />;
          })
        ) : !loading ? (
          <p className="text-gray-500 text-center">No posts yet.</p>
        ) : null}

        {loading && (
          <p className="text-center py-4 text-gray-500 dark:text-gray-400">
            Loading posts...
          </p>
        )}

        {!pagination?.hasNextPage && !loading && posts.length > 0 && (
          <p className="text-center py-4 text-gray-500 dark:text-gray-400">
            No More Posts
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
