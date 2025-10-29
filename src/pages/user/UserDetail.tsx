import { useParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PostCard from "@/components/common/PostCard";

const UserDetail = () => {
  const { userId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const user = {
    id: userId,
    name: "Ali Raza",
    email: "ali.raza@example.com",
    bio: "",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  const posts = [
    {
      _id: "1",
      author: { name: user.name, avatar: user.avatar },
      content: "Excited to share my new project with you all! 🚀",
      images: [
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      ],
      createdAt: new Date().toISOString(),
      likes: 25,
      comments: 8,
    },
    {
      _id: "2",
      author: { name: user.name, avatar: user.avatar },
      content: "Nothing beats a cup of coffee and clean code ☕",
      images: ["https://images.unsplash.com/photo-1633356122544-f134324a6cee"],
      createdAt: new Date().toISOString(),
      likes: 12,
      comments: 3,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-6 mb-8 border-b pb-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-gray-500">{user.email}</p>
          {user.bio && (
            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
              {user.bio}
            </p>
          )}
        </div>

        <Button
          onClick={() => setIsFollowing((prev) => !prev)}
          variant="outline"
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Posts</h3>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-gray-500 text-center">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
