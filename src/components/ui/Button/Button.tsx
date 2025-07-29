import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "stroke";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick: () => void;
}

export default function Button({
  onClick,
  children,
  variant = "primary",
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const baseClass = styles["btn-base"];
  const variantClass = styles[`btn-${variant}`];
  
  const handleClick = () => {
    console.log("Clicked!");
  };

  return (
    <button className={clsx(baseClass, variantClass)} {...props} onClick={handleClick}>
      {leftIcon && <span className={styles["btn-icon-left"]}>{leftIcon}</span>}
      {children && <span>{children}</span>}
      {rightIcon && (
        <span className={styles["btn-icon-right"]}>{rightIcon}</span>
      )}
    </button>
  );
}
