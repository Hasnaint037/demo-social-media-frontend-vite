import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
}

function Signup() {
  const form = useForm<SignupFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
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
          Create an Account
        </h2>

        <Input
          form={form}
          label="Full Name"
          registerName="fullName"
          required
          registerOptions={{
            minLength: { value: 3, message: "Full name must be at least 3 characters" },
          }}
          placeholder="Enter your full name"
        />

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
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          }}
          placeholder="Enter your password"
        />

        <Button
          type="submit"
          className="w-full"
          variant="blue"
          loading={isSubmitting}
        >
          Sign Up
        </Button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
