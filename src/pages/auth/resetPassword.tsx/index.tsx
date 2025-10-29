import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUTH_PATHS } from "@/routes/paths/authPaths";
import { useStore } from "@/store";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/shallow";

interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { resetPassword } = useStore(
    useShallow((store) => ({
      resetPassword: store.resetPassword,
    }))
  );

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (!token) return;
    resetPassword(data.newPassword, token, () => {
      navigate(AUTH_PATHS.LOGIN);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your new password below to reset your account.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* New Password */}
          <Input
            form={form}
            label="New Password"
            registerName="newPassword"
            type="password"
            required
            placeholder="Enter your new password"
            registerOptions={{
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
          />

          {/* Confirm Password */}
          <Input
            form={form}
            label="Confirm Password"
            registerName="confirmPassword"
            type="password"
            required
            placeholder="Re-enter your new password"
            registerOptions={{
              validate: (value) =>
                value === form.getValues("newPassword") ||
                "Passwords do not match",
            }}
          />

          <Button type="submit" className="mt-2">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
