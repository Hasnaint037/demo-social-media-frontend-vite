import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";

interface FormValues {
  caption: string;
}

const CreatePost: React.FC = () => {
  const form = useForm<FormValues>();
  const { handleSubmit, reset, control } = form;
  const [isExpanded, setIsExpanded] = useState(false);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const { user, createPost, postLoading } = useStore(
    useShallow((store) => ({
      user: store.user,
      createPost: store.createPost,
      postLoading: store.postLoading,
    }))
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagesPreview((prev) => [...prev, ...newPreviews]);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setImages([]);
    setIsExpanded(false);
    reset();
  };

  const onSubmit = (data: FormValues) => {
    createPost(data.caption, images, () => {
      reset();
      setImages([]);
      setImagesPreview([]);
      handleCancel();
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow mb-6">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          {!isExpanded ? (
            <Input
              control={control}
              name="caption"
              placeholder={`What's on your mind, ${user?.name.split(" ")[0]}?`}
              onFocus={() => setIsExpanded(true)}
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full cursor-pointer outline-none"
            />
          ) : (
            <AnimatePresence>
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Textarea
                  form={form}
                  registerName="caption"
                  required
                  placeholder="Write something..."
                  className="w-full resize-none bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-3 rounded-lg outline-none min-h-[100px]"
                  autoFocus
                />
                {imagesPreview.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {imagesPreview.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-24 h-24 rounded-lg overflow-hidden"
                      >
                        <img
                          src={img}
                          alt={`preview-${i}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between items-center mt-4">
                  <label
                    htmlFor="file"
                    className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-500"
                  >
                    <ImagePlus size={18} />
                    <span className="text-sm">Add Photo</span>
                  </label>
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleCancel}
                      className="rounded-full"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                      className="bg-blue-600 text-white rounded-full px-3 hover:bg-blue-700"
                      loading={postLoading}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
