export function handleError(error: any): string {
  if (typeof error.response.data.message) {
    if (typeof error?.response?.data?.message === "string") {
      return error?.response?.data?.message;
    }
    return error.response.data.message.message;
  }
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  return "Something went wrong";
}
