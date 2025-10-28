import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";

function SearchUser() {
  const form = useForm();
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  const users = [
    {
      id: 1,
      name: "Ayesha Khan",
      bio: "Frontend Developer | React Enthusiast 🚀",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 2,
      name: "Ali Raza",
      bio: "MERN Stack Developer | Open Source Lover 💻",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 3,
      name: "Zara Sheikh",
      bio: "UI/UX Designer | Minimalism is key 🎨",
      avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    {
      id: 4,
      name: "Hamza Ahmed",
      bio: "Full Stack Engineer | Coffee & Code ☕",
      avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    },
  ];

  // Watch the input field from react-hook-form
  const watchSearch = form.watch("searchText");

  useEffect(() => {
    if (watchSearch === undefined) return;
    // Set a debounce timer (2s)
    const delayDebounce = setTimeout(() => {
      const search = watchSearch.trim().toLowerCase();
      setSearchText(search);

      if (search === "") {
        setFilteredUsers([]);
      } else {
        const results = users.filter((user) =>
          user.name.toLowerCase().includes(search)
        );
        setFilteredUsers(results);
      }
    }, 2000);

    // Cleanup previous timer on re-type
    return () => clearTimeout(delayDebounce);
  }, [watchSearch]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Discover & Follow Users
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Find and connect with people who share your interests.
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-12">
        <Search className="absolute left-3 top-6 text-gray-400" size={20} />
        <Input
          form={form}
          registerName="searchText"
          placeholder="Search users..."
          className="pl-10 py-5 text-base"
        />
      </div>

      {searchText && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Card
                key={user.id}
                className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {user.bio}
                  </p>
                  <Button variant="outline" className="mt-2">
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center col-span-full text-muted-foreground">
              No users found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchUser;
