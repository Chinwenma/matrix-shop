"use client";

import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils"; // optional utility for merging classNames (see below)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition px-5 py-2.5";

  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline:
      "border border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-gray-800",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
