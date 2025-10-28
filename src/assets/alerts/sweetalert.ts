import Swal from "sweetalert2";

interface SweetAlertOptions {
  title: string;
  text: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
}

export const showConfirmAlert = async ({
  title,
  text,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  confirmButtonColor = "#51A2FF",
}: SweetAlertOptions): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    reverseButtons: true,
    width: "30em",
  });

  return result.isConfirmed;
};
