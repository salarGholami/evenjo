"use client";

import { Eye, EyeOff, Search } from "lucide-react";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  maxLength?: number;
  showCharCount?: boolean;
  icon?: "search" | "none";
  size?: "sm" | "md";
};

export default function RHFTextField({
  name,
  label,
  placeholder = "",
  type = "text",
  maxLength,
  showCharCount = true,
  icon = "none",
  size = "md",
}: Props) {
  const { control, formState } = useFormContext();
  const errorFromForm = formState.errors[name]?.message as string | undefined;
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
  };

  return (
    <div className="flex flex-col w-full space-y-1 relative">
      <label
        htmlFor={name}
        className={clsx(
          "text-sm absolute -top-0.5 left-3 transform -translate-y-1/2 transition-colors",
          errorFromForm
            ? "text-error-400"
            : isFocused
              ? "text-success-400 -top-3"
              : "text-white"
        )}
      >
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => {
          const hasError = !!errorFromForm;
          const valueLength = field.value?.length || 0;

          const ringColor = hasError
            ? "ring-error-400"
            : isFocused
              ? "ring-success-400"
              : "ring-neutral-700";

          const textColor = hasError
            ? "text-error-400"
            : isFocused
              ? "text-success-400"
              : "text-neutral-400";

          const inputType =
            type === "password" ? (showPassword ? "text" : "password") : type;

          return (
            <>
              <div
                className={clsx(
                  "flex items-center rounded-md ring-1 bg-transparent transition-colors",
                  ringColor,
                  sizeClasses[size]
                )}
              >
                {icon === "search" && (
                  <Search className="w-4 h-4 mr-2 text-white opacity-70" />
                )}

                <input
                  {...field}
                  id={name}
                  type={inputType}
                  placeholder={placeholder}
                  maxLength={maxLength}
                  className="w-full bg-transparent text-white placeholder:text-neutral-100/40 focus:outline-none"
                  onFocus={() => setIsFocused(true)}
                  onBlur={(e) => {
                    setIsFocused(false);
                    field.onBlur();
                  }}
                />

                {type === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="ml-2 text-white/60 hover:text-white transition"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between mt-1 px-1">
                <span className={clsx("text-xs", textColor)}>
                  {errorFromForm || ""}
                </span>

                {/* فقط وقتی فوکوس و در حال تایپ هست کاراکتر شمار نشان بده */}
                {showCharCount && maxLength && isFocused && valueLength > 0 && (
                  <span className={clsx("text-xs", textColor)}>
                    {valueLength} / {maxLength}
                  </span>
                )}
              </div>
            </>
          );
        }}
      />
    </div>
  );
}
