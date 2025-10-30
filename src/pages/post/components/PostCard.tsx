import { useState } from "react";
import { Share2, Trash2, Heart } from "lucide-react";
import { showConfirmAlert } from "@/assets/alerts/sweetalert";
import { useStore } from "@/store";
import type { Post } from "@/store/slices/post.slice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATHS } from "@/routes/paths/protectedPaths";

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
  const [processingLike, setProcessingLike] = useState(false);

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
