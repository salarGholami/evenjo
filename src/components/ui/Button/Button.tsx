import React from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "stroke";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string; 
}

export default function Button({
  children,
  variant = "primary",
  leftIcon,
  rightIcon,
  className,
  ...props
}: ButtonProps) {
  const baseClass = styles["btn-base"];
  const variantClass = styles[`btn-${variant}`];

  return (
    <button
      {...props}
      className={clsx(baseClass, variantClass, className)}
    >
      {leftIcon && <span className={styles["btn-icon-left"]}>{leftIcon}</span>}
      {children && <span>{children}</span>}
      {rightIcon && (
        <span className={styles["btn-icon-right"]}>{rightIcon}</span>
      )}
    </button>
  );
}
