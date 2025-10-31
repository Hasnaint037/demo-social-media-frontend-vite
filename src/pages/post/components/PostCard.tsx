import { useState } from "react";
import { Share2, Trash2, Heart } from "lucide-react";
import { showConfirmAlert } from "@/assets/alerts/sweetalert";
import { useStore } from "@/store";
import type { Post } from "@/store/slices/post.slice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATHS } from "@/routes/paths/protectedPaths";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  post: Post;
  canShare?: boolean;
  canDelete?: boolean;
  onDelete?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  canShare = true,
  canDelete = false,
  onDelete,
}) => {
  const navigate = useNavigate();
  const toggleLike = useStore((state) => state.toggleLike);
  const user = useStore((state) => state.user);
  const [processingLike, setProcessingLike] = useState<boolean>(false);
  const [showAllImages, setShowAllImages] = useState<boolean>(false);

  if (!user) return null;

  const likedByCurrentUser = post.likesData.includes(user._id);

  const handleLike = async () => {
    if (processingLike) return;
    setProcessingLike(true);
    toggleLike(post._id, user._id);
    setProcessingLike(false);
  };

  const handleDeletePost = async (id: string) => {
    const confirmed = await showConfirmAlert({
      title: "Are you sure?",
      text: "Do you want to delete this post?",
      confirmButtonText: "Delete",
    });
    if (confirmed) onDelete?.(id);
  };

  const renderImages = (imgs: string[]) => {
    if (!imgs || imgs.length === 0) return null;

    if (imgs.length === 1) {
      return (
        <img
          src={imgs[0]}
          alt="post"
          className="w-full h-64 object-cover rounded-xl mb-3"
        />
      );
    }

    if (imgs.length === 2 || (imgs.length > 2 && showAllImages)) {
      return (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {imgs.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`post-${i}`}
              className="w-full h-56 object-cover rounded-xl"
            />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2 mb-3 relative">
        <img
          src={imgs[0]}
          alt="post-0"
          className="w-full h-56 object-cover rounded-xl"
        />
        <div
          className="relative cursor-pointer"
          onClick={() => setShowAllImages(true)}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => setShowAllImages(true)}
          >
            <img
              src={imgs[1]}
              alt="post-1"
              className="w-full h-56 object-cover rounded-xl filter blur-[1.5px] brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
              +{imgs.length - 2}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm mb-6"
    >
      {canDelete && (
        <span
          onClick={() => handleDeletePost(post._id)}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          <Trash2 size={18} />
        </span>
      )}

      {/* Author Info */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
          onClick={() =>
            navigate(PROTECTED_PATHS.USERS.PROFILE, {
              state: { user: post.author },
            })
          }
        >
          <AvatarImage src={post?.author.profilePicture} />
          <AvatarFallback>{post.author?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 dark:text-white">
            {post.author?.name}
          </p>
          <span className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {post.content && (
        <p className="text-gray-800 dark:text-gray-200 mb-3">{post.content}</p>
      )}

      {renderImages(post.media)}

      {post.originalPost && (
        <div className="border border-gray-300 dark:border-gray-700 rounded-xl p-3 mt-3 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="w-8 h-8 rounded-full overflow-hidden">
              <AvatarImage src={post.originalPost.author.profilePicture} />
              <AvatarFallback>
                {post.originalPost.author.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {post.originalPost.author.name}
              </p>
              <span className="text-xs text-gray-500">
                {new Date(post.originalPost.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
            {post.originalPost.content}
          </p>
          {renderImages(post.originalPost.media)}
        </div>
      )}

      <div className="flex justify-between items-center mt-4 text-gray-600 dark:text-gray-400">
        <button
          onClick={handleLike}
          disabled={processingLike}
          className={`flex items-center gap-1 transition-colors cursor-pointer ${
            likedByCurrentUser ? "text-blue-500" : "hover:text-blue-400"
          }`}
        >
          <Heart
            size={18}
            fill={likedByCurrentUser ? "blue" : "none"}
            className={`transition-transform ${
              processingLike ? "opacity-50" : ""
            }`}
          />
          <span className="text-sm">{post.likesCount}</span>
        </button>

        {canShare && (
          <button className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
            <Share2 size={18} /> Share
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default PostCard;
