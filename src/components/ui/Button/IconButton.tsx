import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "stroke";
  "aria-label": string;
}

export default function IconButton({
  icon,
  variant = "primary",
  ...props
}: IconButtonProps) {
  const baseClass = styles["btn-base"];
  const variantClass = styles[`btn-${variant}`];
  const iconOnlyClass = styles["btn-icon-only"];

  return (
    <button className={clsx(baseClass, variantClass, iconOnlyClass)} {...props}>
      {icon}
    </button>
  );
}
