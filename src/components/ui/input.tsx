import * as React from "react";
import {
  useController,
  type Control,
  type RegisterOptions,
} from "react-hook-form";

interface BaseInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  label?: string;
  required?: boolean;
  className?: string;
}

interface ControlledInputProps extends BaseInputProps {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
}

interface UncontrolledInputProps extends BaseInputProps {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  control,
  name,
  rules,
  label,
  required = true,
  className,
  type = "text",
  ...props
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      ...rules,
      ...(required && !rules?.required
        ? { required: `${label || name} is required` }
        : {}),
    },
    defaultValue: "",
  });

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        className={`px-3 py-2 border rounded-md w-full 
          focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 
          transition duration-150 ease-in-out ${
            error ? "border-red-500 focus:ring-red-100" : ""
          } ${className || ""}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">
          {error.message || "Invalid input"}
        </p>
      )}
    </div>
  );
};

const UncontrolledInput: React.FC<UncontrolledInputProps> = ({
  value: propValue,
  onChange: propOnChange,
  label,
  required = true,
  className,
  type = "text",
  ...props
}) => {
  const [value, setValue] = React.useState(propValue ?? "");

  const handleChange =
    propOnChange ??
    ((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value));

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        className={`px-3 py-2 border rounded-md w-full 
          focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 
          transition duration-150 ease-in-out ${className || ""}`}
        {...props}
      />
    </div>
  );
};

const Input: React.FC<
  ControlledInputProps | (UncontrolledInputProps & { name?: string })
> = (props) => {
  if ("control" in props && props.control && "name" in props) {
    return <ControlledInput {...(props as ControlledInputProps)} />;
  }
  return <UncontrolledInput {...(props as UncontrolledInputProps)} />;
};

export { Input };
