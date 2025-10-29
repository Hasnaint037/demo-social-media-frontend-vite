import CreatePost from "@/components/common/CreatePost";
import PostCard from "@/components/common/PostCard";

const MyPosts = () => {
  const posts = [
    {
      _id: "1",
      author: {
        name: "Roman",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      content: "Just finished building my new crypto dashboard 🚀",
      images: [
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      ],
      createdAt: "2025-10-27T12:00:00Z",
      likes: 32,
      comments: 5,
    },
    {
      _id: "2",
      author: {
        name: "Roman",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      content: "Excited to share this amazing post by my friend 👇",
      images: [],
      createdAt: "2025-10-26T10:30:00Z",
      likes: 10,
      comments: 3,
      originalPost: {
        author: {
          name: "Ali Raza",
          avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        },
        content: "MERN Stack is love ❤️",
        images: [
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        ],
      },
    },
    {
      _id: "3",
      author: {
        name: "Roman",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      content: "Minimalism in UI design makes everything cleaner ✨",
      images: ["https://images.unsplash.com/photo-1633356122544-f134324a6cee"],
      createdAt: "2025-10-25T18:45:00Z",
      likes: 22,
      comments: 2,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-4 px-3">
      <CreatePost />
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post._id} post={post} canShare canDelete />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-8">
          You haven’t created any posts yet.
        </p>
      )}
    </div>
  );
};

export default MyPosts;
