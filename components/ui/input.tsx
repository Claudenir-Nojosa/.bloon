"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            "flex h-10 w-full rounded-2xl border border-input hover:border-[#17f7a978] dark:bg-[#000] bg-transparent px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <Icons.eye className="h-4 w-4 text-gray-500" />
            ) : (
              <Icons.eyeOff className="h-4 w-4 text-gray-500" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
