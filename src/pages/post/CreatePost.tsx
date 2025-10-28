import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CreatePost = () => {
  const form = useForm();
  const [images, setImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { handleSubmit } = form;

  const onSubmit = (data: any) => {
    console.log("Post data:", data);
    console.log("Uploaded images:", images);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Create a New Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Textarea
            form={form}
            registerName="caption"
            label="Your Thoughts"
            placeholder="Share your thoughts..."
            className="min-h-28"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-medium text-gray-700 mb-2 block">
            Upload Images
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="images"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                <Upload />
                <p className="text-sm">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-400">PNG, JPG or JPEG</p>
              </div>
            </label>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {images.map((src, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden border"
              >
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  className="w-full h-40 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" className="px-6">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
