import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUTH_PATHS } from "@/routes/paths/authPaths";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface ForgotPasswordFormValues {
  email: string;
}

function ForgotPassword() {
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log("Reset link will be sent to:", data.email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your email address below and we’ll send you a link to reset your password.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Input
            form={form}
            label="Email"
            registerName="email"
            type="email"
            required
            placeholder="Enter your email address"
            registerOptions={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            }}
          />

          <Button type="submit" className="mt-2">
            Send Reset Link
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Remember your password?{" "}
          <Link
          to={AUTH_PATHS.LOGIN}
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
