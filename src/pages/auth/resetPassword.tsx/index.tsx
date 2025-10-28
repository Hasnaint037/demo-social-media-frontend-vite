import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

function ResetPassword() {
  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    console.log("Password reset data:", data);
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
}

export default ResetPassword;
