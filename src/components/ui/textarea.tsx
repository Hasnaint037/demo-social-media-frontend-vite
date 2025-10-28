import * as React from "react";
import type { UseFormReturn, RegisterOptions } from "react-hook-form";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "form"> {
  form: UseFormReturn<any>;
  registerName: string;
  registerOptions?: RegisterOptions;
  label?: string;
  required?: boolean;
  height?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  form,
  registerName,
  registerOptions,
  label,
  required = true,
  className,
  height,
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
          {required && <span className="text-red-300 ml-1">*</span>}
        </label>
      )}

      <textarea
        data-slot="textarea"
        className={cn(
          `border-input placeholder:text-muted-foreground 
          focus-visible:border-ring focus-visible:ring-ring/50 
          aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 
          aria-invalid:border-destructive dark:bg-input/30 
          min-h-16 w-full rounded-md border bg-transparent px-3 py-2 
          text-base shadow-xs transition-[color,box-shadow] outline-none 
          focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 
          md:text-sm ${
            error ? "border-red-500 focus-visible:ring-red-100" : ""
          }`,
          height,
          className
        )}
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

export { Textarea };
