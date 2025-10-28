import CreatePost from "@/components/common/CreatePost";
import PostCard from "@/components/common/PostCard";

const Home = () => {
  const posts = [
    {
      _id: "1",
      author: {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      content: "Just launched my new portfolio website 🚀 #React #MERN",
      images: [
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      ],
      createdAt: new Date().toISOString(),
      likes: 45,
      comments: 10,
    },
    {
      _id: "2",
      author: {
        name: "Sarah Ali",
        avatar: "https://randomuser.me/api/portraits/women/25.jpg",
      },
      content: "Weekend vibes 🌄 — nature always refreshes the soul!",
      images: ["https://images.unsplash.com/photo-1633356122544-f134324a6cee"],
      createdAt: new Date().toISOString(),
      likes: 67,
      comments: 14,
    },
    {
      _id: "3",
      author: {
        name: "Mike Ross",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      },
      content: "This post by Jessica is a must-read for all devs 💡",
      createdAt: new Date().toISOString(),
      likes: 22,
      comments: 4,
      originalPost: {
        author: {
          name: "Jessica Lee",
          avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        },
        content:
          "Consistency is more powerful than motivation. Build daily habits 🔥",
        images: [
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        ],
      },
    },
  ];

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

      {posts.map((post) => (
        <PostCard key={post._id} post={post} canShare={true} />
      ))}
    </div>
  );
};

export default Home;
