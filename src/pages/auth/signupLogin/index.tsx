import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AUTH_PATHS } from "@/routes/paths/authPaths";

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const location = useLocation();
  const [isSignup, setIsSignup] = useState<boolean>(
    location.pathname === AUTH_PATHS.SIGNUP ? true : false
  );

  const form = useForm<SignupFormValues>({
    defaultValues: isSignup
      ? { fullName: "", email: "", password: "" }
      : { email: "", password: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data: SignupFormValues) => {
    console.log("Signup Data:", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {isSignup ? "Create an " : "Login to your "}
          Account
        </h2>

        {isSignup && (
          <Input
            form={form}
            label="Full Name"
            registerName="fullName"
            required
            registerOptions={{
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters",
              },
            }}
            placeholder="Enter your full name"
          />
        )}

        <Input
          form={form}
          label="Email"
          type="email"
          registerName="email"
          required
          registerOptions={{
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
          placeholder="Enter your email"
        />

        <Input
          form={form}
          label="Password"
          type="password"
          registerName="password"
          required
          registerOptions={{
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          placeholder="Enter your password"
        />

        <Button
          type="submit"
          className="w-full mt-2"
          variant="blue"
          loading={isSubmitting}
        >
          {isSignup ? "Signup" : "Login"}
        </Button>

        <p className="text-sm text-center text-gray-600">
          {isSignup ? " Already have an account?" : "Do not have an account?"}
          <span
            className="text-blue-500 hover:underline font-medium cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Signup"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
