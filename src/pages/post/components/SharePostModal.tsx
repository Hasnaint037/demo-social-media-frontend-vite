import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PostCard from "@/pages/post/components/PostCard";
import { Dialog } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";

interface SharePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
}

interface formData {
  content: string;
}

const SharePostModal = ({ isOpen, onClose, post }: SharePostModalProps) => {
  const form = useForm<formData>();
  const { handleSubmit } = form;
  const { sharePost, loading } = useStore(
    useShallow((store) => ({
      sharePost: store.sharePost,
      loading: store.postLoading,
    }))
  );

  const onSubmit = async (data: formData) => {
    sharePost(post._id, data.content, () => {
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} showCloseIcon={false}>
      <div className="flex flex-col space-y-4">
        <Textarea
          form={form}
          registerName="content"
          placeholder="Say something about this post..."
          rows={3}
          required
          className="border-none shadow-none"
        />

        <div className="border rounded-xl p-3 bg-gray-50 ">
          <PostCard post={post} canShare={false} canDelete={false} />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? "Sharing..." : "Share"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default SharePostModal;
