import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATHS } from "@/routes/paths/protectedPaths";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";

const SearchUser = () => {
  const form = useForm();
  const { watch } = form;
  const navigate = useNavigate();

  const { searchUser, users, loading } = useStore(
    useShallow((store) => ({
      searchUser: store.searchUser,
      users: store.users || [],
      loading: store.profileLoading,
    }))
  );

  const watchSearch = watch("searchText");

  useEffect(() => {
    if (watchSearch === undefined) return;

    const delayDebounce = setTimeout(() => {
      const search = watchSearch.trim();

      if (search === "") return;

      searchUser(search);
    }, 500);

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

      {/* 🔍 Search Bar */}
      <div className="relative max-w-md mx-auto mb-12">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          form={form}
          registerName="searchText"
          placeholder="Search users..."
          className="pl-10 py-5 text-base"
        />
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {!loading && users?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user: any) => (
            <Card
              key={user._id}
              className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 cursor-pointer"
              onClick={() =>
                navigate(PROTECTED_PATHS.USERS.PROFILE, {
                  state: {
                    user: user,
                  },
                })
              }
            >
              <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
                <Avatar className="w-20 h-20 rounded-full overflow-hidden">
                  <AvatarImage
                    src={user.profilePicture}
                    alt={user.name || "U"}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <AvatarFallback className="rounded-full bg-gray-200 text-gray-600">
                    {user.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>

                <h3 className="text-lg font-semibold">{user.name}</h3>
                {user.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {user.bio}
                  </p>
                )}
                <Button variant="outline" className="mt-2">
                  Follow
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        !loading &&
        watchSearch && (
          <p className="text-center text-muted-foreground">No users found</p>
        )
      )}
    </div>
  );
};

export default SearchUser;
