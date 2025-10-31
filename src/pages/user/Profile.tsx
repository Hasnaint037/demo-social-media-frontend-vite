import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";

interface ProfileProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isViewMode: boolean;
}

const Profile: React.FC<ProfileProps> = ({ open, setOpen, isViewMode }) => {
  const { user, updateProfile, loading } = useStore(
    useShallow((store) => ({
      user: store.user,
      updateProfile: store.updateProfile,
      loading: store.profileLoading,
    }))
  );

  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File>();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = form;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const onSubmit = (data: any) => {
    updateProfile(data.name, data.email, data.bio, image, () => {
      setOpen(false);
    });
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
      });
      setPreview(user.profilePicture || null);
    }
  }, [user, reset]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      showCloseIcon={isViewMode}
    >
      <form className="flex flex-col gap-6 items-center sm:items-stretch">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src={preview || user?.profilePicture} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          {!isViewMode && (
            <label
              htmlFor="avatar"
              className="cursor-pointer text-sm font-medium text-blue-600 hover:underline"
            >
              Change Picture
            </label>
          )}
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isViewMode}
          />
        </div>

        <div className="w-full">
          <Input
            control={control}
            required={!isViewMode}
            label="Name"
            name="name"
            id="name"
            type="text"
            placeholder="Enter your name"
            disabled={isViewMode}
          />
        </div>

        <div className="w-full">
          <Input
            control={control}
            required={!isViewMode}
            label="Email"
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            disabled={isViewMode}
          />
        </div>

        <div className="w-full">
          <Textarea
            label="Bio"
            required={!isViewMode}
            form={form}
            registerName="bio"
            id="bio"
            registerOptions={{
              minLength: {
                value: 12,
                message: "Bio must be at least 6 characters long",
              },
            }}
            placeholder="Write something about yourself..."
            disabled={isViewMode}
          />
        </div>

        {!isViewMode && (
          <div className="flex justify-end w-full gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              loading={loading}
              disabled={(!isDirty && !image) || loading}
            >
              Update Profile
            </Button>
          </div>
        )}
      </form>
    </Dialog>
  );
};

export default Profile;
