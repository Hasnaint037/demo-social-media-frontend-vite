import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

interface ProfileProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isViewMode: boolean;
}

const Profile: React.FC<ProfileProps> = ({ open, setOpen, isViewMode }) => {
  const form = useForm();
  const [preview, setPreview] = useState<string | null>(null);
  const { handleSubmit } = form;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      showCloseIcon={isViewMode}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 items-center sm:items-stretch"
      >
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src={preview || "/placeholder-avatar.png"} />
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
            form={form}
            required={!isViewMode}
            label="Name"
            registerName="name"
            id="name"
            type="text"
            placeholder="Enter your name"
            disabled={isViewMode}
          />
        </div>

        <div className="w-full">
          <Input
            form={form}
            required={!isViewMode}
            label="Email"
            registerName="email"
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
            <Button type="submit">Save Changes</Button>
          </div>
        )}
      </form>
    </Dialog>
  );
};

export default Profile;
