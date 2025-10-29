import { toast } from "react-toastify";
import { handleError } from "./errorHandler";

export async function tryCatchWrapper<T>(
  asyncFn: () => Promise<T>,
  onSuccess?: (data: T) => void
) {
  try {
    const data = await asyncFn();
    onSuccess?.(data);
    return data;
  } catch (error: any) {
    const message = handleError(error);
    toast.error(message || "Something went wrong");
    throw error;
  }
}
