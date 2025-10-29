import { useState } from "react";
import { Share2, Trash2 } from "lucide-react";
import { showConfirmAlert } from "@/assets/alerts/sweetalert";

interface Author {
  name: string;
  avatar: string;
}

interface OriginalPost {
  author: Author;
  content: string;
  images?: string[];
}

interface Post {
  _id: string;
  author: Author;
  content: string;
  images?: string[];
  createdAt: string;
  likes: number;
  comments: number;
  originalPost?: OriginalPost;
}

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
  const [showAllImages, setShowAllImages] = useState(false);
  const images = post.images || [];

  const handleDeletePost = async (id: string) => {
    const confirmed = await showConfirmAlert({
      title: "Are you sure?",
      text: "Do you want to delete this post?",
      confirmButtonText: "Delete",
    });
    if (confirmed) onDelete?.(id);
  };

  const renderImages = (imgs: string[]) => {
    if (imgs.length === 1) {
      return (
        <img
          src={imgs[0]}
          alt="post"
          className="w-full h-64 object-cover rounded-xl"
        />
      );
    }

    if (imgs.length === 2) {
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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 rounded-xl overflow-hidden mb-3">
        {(showAllImages ? imgs : imgs.slice(0, 2)).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`post-${i}`}
            className="w-full h-40 object-cover rounded-xl"
          />
        ))}
        {imgs.length > 4 && !showAllImages && (
          <button
            onClick={() => setShowAllImages(true)}
            className="bg-black bg-opacity-50 text-white text-sm rounded-lg p-2"
          >
            +{imgs.length - 2} more
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm mb-6">
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
        <img
          src={post.author?.avatar}
          alt={post.author?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {post.author?.name}
          </p>
          <span className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Post Content */}
      {post.content && (
        <p className="text-gray-800 dark:text-gray-200 mb-3">{post.content}</p>
      )}

      {images.length > 0 && renderImages(images)}

      {post.originalPost && (
        <div className="border border-gray-300 dark:border-gray-700 rounded-xl p-3 mt-2">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={post.originalPost.author.avatar}
              alt={post.originalPost.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {post.originalPost.author.name}
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
            {post.originalPost.content}
          </p>
          {post.originalPost.images?.length
            ? renderImages(post.originalPost.images)
            : null}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end items-center mt-4 text-gray-600 dark:text-gray-400">
        {canShare && (
          <button className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
            <Share2 size={18} /> Share
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
