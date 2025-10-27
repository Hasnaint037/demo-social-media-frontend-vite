import * as React from "react";
import type {
  UseFormReturn,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
  form: UseFormReturn<FieldValues>;
  registerName: string;
  registerOptions?: RegisterOptions;
  label?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  form,
  registerName,
  registerOptions,
  className,
  label,
  required=true,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  const error = errors?.[registerName];

  const mergedOptions: RegisterOptions = {
    ...registerOptions,
    ...(required && !registerOptions?.required
      ? { required: `${label || registerName} is required` }
      : {}),
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-medium text-gray-700">
          {label}
          {required && <span className="text-red-300 mr-1">*</span>}
        </label>
      )}

      <input
        type={type}
        data-slot="input"
        className={`px-3 py-2 border rounded-md w-full 
          focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 
          transition duration-150 ease-in-out ${
            error ? "border-red-500 focus:ring-red-100" : ""
          } ${className || ""}`}
        {...register(registerName, mergedOptions)}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-400">
          {(error as any)?.message || "Invalid input"}
        </p>
      )}
    </div>
  );
};

export { Input };
