import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ThreeDots } from "react-loader-spinner";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        blue: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
        outline:
          "border border-blue-400 text-blue-400 hover:bg-blue-50 active:bg-blue-100",
      },
      size: {
        default: "h-11 px-3",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        disabled={loading || props.disabled}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ThreeDots
              visible={true}
              height="28"
              width="34"
              color={variant === "outline" ? "#51A2FF" : "white"}
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </div>
        )}
        <span className={cn(loading && "opacity-0")}>{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
