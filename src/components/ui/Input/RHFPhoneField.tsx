"use client";

import { useState, useRef, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";
import { getCountryCallingCode, CountryCode } from "libphonenumber-js";
import * as Flags from "country-flag-icons/react/3x2";

type RHFPhoneFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  countries?: CountryCode[];
};

function formatPhoneNumber(value: string) {
  const phoneNumber = value.replace(/\D/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength === 0) return "";

  if (phoneNumberLength < 4) return `(${phoneNumber}`;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
}

export default function RHFPhoneField({
  name,
  label,
  placeholder = "Enter phone number",
  maxLength = 16, // طول کافی برای + و کد
  countries = ["US", "IR", "GB", "DE", "FR"],
}: RHFPhoneFieldProps) {
  const {
    control,
    formState: { errors },
    setValue,
    getFieldState,
  } = useFormContext();

  const errorFromForm = errors[name]?.message as string | undefined;
  const fieldState = getFieldState(name);
  const [isFocused, setIsFocused] = useState(false);
  const [country, setCountry] = useState<CountryCode>("IR");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const Flag = (Flags as any)[country] || Flags.US;
  const dialCode = `+${getCountryCallingCode(country)}`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div className="flex flex-col w-full space-y-1 relative">
          <label
            htmlFor={name}
            className={clsx(
              "text-sm absolute -top-0.5 left-3 transform -translate-y-1/2 transition-colors bg-[#0d0d0d]",
              errorFromForm
                ? "text-red-400"
                : fieldState.isTouched && !errorFromForm
                  ? "text-green-500"
                  : isFocused
                    ? "text-tint-500"
                    : "text-white"
            )}
          >
            {label}
          </label>

          <div
            className={clsx(
              "flex items-center rounded-md ring-1 bg-transparent transition-colors px-3 py-2",
              errorFromForm
                ? "ring-red-400"
                : fieldState.isTouched && !errorFromForm
                  ? "ring-green-500"
                  : isFocused
                    ? "ring-tint-500"
                    : "ring-neutral-700"
            )}
          >
            {/* پرچم و کد کشور */}
            <div className="relative flex items-center mr-2" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-1 cursor-pointer select-none"
              >
                <Flag className="w-5 h-5 rounded-sm" />
                <span className="text-white text-sm">{dialCode}</span>
                <svg
                  className={clsx(
                    "w-3 h-3 ml-1 text-white transition-transform",
                    open && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {open && (
                <div className="absolute top-full left-0 mt-1 bg-neutral-900 rounded-md shadow-lg z-10 max-h-48 overflow-auto">
                  {countries.map((c) => {
                    const CFlag = (Flags as any)[c] || Flags.US;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setCountry(c);
                          setOpen(false);
                          if (field.value) {
                            const rawNumber = field.value.replace(/\D/g, "");
                            setValue(
                              name,
                              `+${getCountryCallingCode(c)}${rawNumber}`
                            );
                          } else {
                            setValue(name, `+${getCountryCallingCode(c)}`);
                          }
                        }}
                        className="flex items-center px-2 py-1 text-white hover:bg-neutral-800 w-full text-sm"
                      >
                        <CFlag className="w-4 h-4 mr-1" />+
                        {getCountryCallingCode(c)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* شماره تلفن */}
            <input
              id={name}
              type="tel"
              placeholder={placeholder}
              maxLength={maxLength}
              className="flex-grow bg-transparent p-2 text-white placeholder:text-neutral-100/40 focus:outline-none pl-3"
              value={formatPhoneNumber(
                field.value.replace(`+${getCountryCallingCode(country)}`, "")
              )}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                const full = `${dialCode}${raw}`;
                setValue(name, full, { shouldValidate: true });
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>

          <span
            className={clsx(
              "text-xs mt-1",
              errorFromForm ? "text-red-400" : "text-green-500"
            )}
          >
            {errorFromForm ?? (fieldState.isTouched && "Looks good!")}
          </span>
        </div>
      )}
    />
  );
}
