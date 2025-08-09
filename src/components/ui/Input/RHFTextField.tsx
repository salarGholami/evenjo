"use client";

import { Eye, EyeOff, Lock, Mail, Search, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";
import { CountryCode, isValidPhoneNumber } from "libphonenumber-js";
import * as Flags from "country-flag-icons/react/3x2";

export type InputType = React.HTMLInputTypeAttribute;
export type IconMode = "auto" | "none" | "custom";
export type SizeType = "sm" | "md";

export type RHFTextFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  type: InputType;
  maxLength: number;
  showCharCount?: boolean;
  iconMode?: IconMode;
  icon?: ReactNode;
  size?: SizeType;
  iconSize?: number;
  iconColor?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
};

const countries = [
  { code: "IR", name: "Iran", dialCode: "+98" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
];

export default function RHFTextField({
  name,
  label,
  placeholder,
  type,
  maxLength,
  showCharCount = false,
  iconMode = "auto",
  icon,
  size = "md",
  iconSize = 16,
  iconColor = "#fff",
  disabled,
  readOnly,
  autoComplete,
}: RHFTextFieldProps) {
  const { control, formState, watch } = useFormContext();
  const errorFromForm = formState.errors[name]?.message as string | undefined;
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [country, setCountry] = useState<CountryCode>("IR");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fullValue = watch(name) || "";
  const [localNumber, setLocalNumber] = useState("");

  useEffect(() => {
    const selectedCountry = countries.find((c) => c.code === country);
    if (!selectedCountry) return;
    if (fullValue.startsWith(selectedCountry.dialCode)) {
      setLocalNumber(fullValue.slice(selectedCountry.dialCode.length));
    } else {
      setLocalNumber("");
    }
  }, [fullValue, country]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sizeClasses: Record<SizeType, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
  };

  const getAutoIcon = () => {
    const iconProps = { size: iconSize, color: iconColor, className: "mr-2" };
    switch (type) {
      case "password":
        return <Lock {...iconProps} />;
      case "email":
        return <Mail {...iconProps} />;
      case "search":
        return <Search {...iconProps} />;
      default:
        return null;
    }
  };

  const leftIcon =
    iconMode === "none" ? null : iconMode === "custom" ? icon : getAutoIcon();
  const selectedCountry = countries.find((c) => c.code === country);
  const FlagComponent = selectedCountry
    ? Flags[selectedCountry.code as CountryCode]
    : null;

  return (
    <div className="flex flex-col w-full space-y-1 relative">
      <label
        htmlFor={name}
        className={clsx(
          "text-sm absolute -top-0.5 left-3 transform -translate-y-1/2 transition-colors bg-[#0d0d0d54]  z-10",
          errorFromForm
            ? "text-red-400 z-20 bg-[#0d0d0d54]"
            : isFocused
              ? "text-green-500"
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
          const valueLength = localNumber.length;
          const hasError = !!errorFromForm;
          const isValid =
            type === "tel"
              ? isValidPhoneNumber(field.value || "")
              : !hasError && !!field.value;
          const showGreen = isFocused && isValid;
          const ringColor = hasError
            ? "ring-red-400"
            : showGreen
              ? "ring-green-500"
              : "ring-neutral-700";
          const textColor = hasError
            ? "text-red-400"
            : showGreen
              ? "text-green-500"
              : "text-neutral-400";
          const inputType =
            type === "password" ? (showPassword ? "text" : "password") : type;

          return (
            <>
              <div
                className={clsx(
                  "flex items-center rounded-md ring-1 bg-neutral-900 transition-colors relative",
                  ringColor,
                  sizeClasses[size]
                )}
              >
                {type === "tel" && selectedCountry ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowDropdown((prev) => !prev)}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-white/80 hover:bg-neutral-700"
                      tabIndex={-1}
                    >
                      {FlagComponent && (
                        <FlagComponent className="w-5 h-4 rounded-sm" />
                      )}
                      <span>{selectedCountry.dialCode}</span>
                      <ChevronDown size={14} className="ml-1" />
                    </button>

                    <div className="w-[1px] h-6 bg-neutral-600 mx-2" />

                    <input
                      id={name}
                      type="tel"
                      inputMode="tel"
                      placeholder={placeholder}
                      maxLength={maxLength}
                      disabled={disabled}
                      readOnly={readOnly}
                      className="w-full bg-neutral-900 p-2 text-white placeholder:text-neutral-100/40 focus:outline-none"
                      value={localNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setLocalNumber(val);
                        field.onChange(selectedCountry.dialCode + val);
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => {
                        setIsFocused(false);
                        field.onBlur();
                      }}
                      autoComplete={autoComplete}
                    />

                    {showDropdown && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-50 top-full mt-1 left-0 w-full bg-neutral-900 border border-neutral-700 rounded-md max-h-60 overflow-y-auto shadow-lg"
                      >
                        {countries.map((c) => {
                          const Flag = Flags[c.code as CountryCode];
                          return (
                            <button
                              key={c.code}
                              type="button"
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-neutral-900"
                              onClick={() => {
                                setCountry(c.code as CountryCode);
                                setShowDropdown(false);
                                field.onChange(c.dialCode + localNumber);
                              }}
                            >
                              {Flag && <Flag className="w-5 h-4 rounded-sm" />}
                              <span>{c.name}</span>
                              <span className="ml-auto text-neutral-400">
                                {c.dialCode}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {leftIcon}
                    <input
                      {...field}
                      id={name}
                      type={inputType}
                      placeholder={placeholder}
                      maxLength={maxLength}
                      disabled={disabled}
                      readOnly={readOnly}
                      className="w-full bg-neutral-900 p-2 text-white placeholder:text-neutral-100/40 focus:outline-none"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => {
                        setIsFocused(false);
                        field.onBlur();
                      }}
                      autoComplete={autoComplete}
                    />
                    {type === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="ml-2 text-white/60 hover:text-white transition"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={iconSize} color={iconColor} />
                        ) : (
                          <Eye size={iconSize} color={iconColor} />
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center justify-between mt-1 px-1">
                <span className={clsx("text-xs", textColor)}>
                  {errorFromForm || ""}
                </span>
                {showCharCount && maxLength && valueLength > 0 && (
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
