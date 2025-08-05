"use client";

import { useState, useEffect } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import * as yup from "yup";
import RHFTextField from "@/components/ui/Input/RHFTextField";
import { Apple, Facebook } from "lucide-react";

export interface RegisterFormValues {
  fullName: string;
  type: "email" | "phone";
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  type: yup.mixed<"email" | "phone">().oneOf(["email", "phone"]).required(),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

interface Props {
  onSubmit?: (data: RegisterFormValues) => void;
}

export default function RegisterForm({ onSubmit }: Props) {
  const [tab, setTab] = useState<"email" | "phone">("email");

  const methods = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      type: "email",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
  } = methods;

  useEffect(() => {
    reset({
      fullName: "",
      type: tab,
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  }, [tab, reset]);

  const onSubmitHandler: SubmitHandler<RegisterFormValues> = (data) => {
    onSubmit?.(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full max-w-sm text-white my-12 md:my-10 p-6"
        noValidate
      >
        {/* لوگو */}
        <div className="flex justify-center mb-2">
          <Image
            src="/images/logo/Evenjo.png"
            alt="Logo"
            width={100}
            height={100}
            priority
          />
        </div>

        {/* توضیح */}
        <p className="mb-5 text-center text-neutral-400 text-sm">
          Please enter your {tab === "email" ? "email" : "phone number"} and
          details
        </p>

        {/* تب انتخاب ایمیل یا شماره */}
        <div className="flex justify-center mb-8 bg-neutral-900 p-1 rounded-md">
          {(["email", "phone"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`p-2 w-full text-center text-sm rounded-md transition-colors ${
                tab === t
                  ? "bg-neutral-600 text-white font-semibold"
                  : "text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              {t === "email" ? "Email" : "Phone"}
            </button>
          ))}
        </div>

        {/* فیلدها */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <RHFTextField
              name="Name"
              label="Name"
              placeholder="Enter name"
              type="text"
              maxLength={50}
              showCharCount
              iconMode="none"
            />
            <RHFTextField
              name="lastName"
              label="LastName"
              placeholder="Enter last name"
              type="text"
              maxLength={50}
              showCharCount
              iconMode="none"
            />
          </div>

          {tab === "email" ? (
            <RHFTextField
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
              maxLength={100}
              showCharCount
              iconMode="auto"
              iconSize={20}
              iconColor="#fff"
              autoComplete="email"
            />
          ) : (
            <RHFTextField
              name="phone"
              label="Phone Number"
              placeholder="(938)8454689"
              type="tel"
              maxLength={12}
              showCharCount
              iconMode="auto"
              iconSize={20}
              iconColor="#fff"
              autoComplete="tel"
            />
          )}

          <RHFTextField
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            maxLength={20}
            showCharCount
            iconMode="auto"
            iconSize={20}
            iconColor="#fff"
            autoComplete="new-password"
          />

          <RHFTextField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Re-enter your password"
            type="password"
            maxLength={20}
            showCharCount
            iconMode="auto"
            iconSize={20}
            iconColor="#fff"
            autoComplete="new-password"
          />
        </div>

        {/* دکمه ثبت */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full rounded-md py-3 font-semibold transition-colors ${
            !isValid || isSubmitting
              ? "bg-purple-700 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>

        {/* لینک لاگین */}
        <p className="mt-4 text-center text-xs text-neutral-400">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Log in
          </a>
        </p>

        {tab === "email" && (
          <>
            <div className="flex items-center my-3">
              <div className="flex-grow h-px bg-neutral-700" />
              <span className="px-3 text-neutral-500 text-sm">
                Or continue with
              </span>
              <div className="flex-grow h-px bg-neutral-700" />
            </div>

            <div className="flex justify-center gap-2">
              <button
                type="button"
                aria-label="Login with Apple"
                className="flex w-full items-center justify-center rounded-md bg-neutral-800 p-3 hover:bg-neutral-700 transition"
              >
                <Apple size={28} className="text-white" />
              </button>
              <button
                type="button"
                aria-label="Login with Google"
                className="flex w-full items-center justify-center rounded-md bg-neutral-800 p-3 hover:bg-neutral-700 transition"
              >
                <Image
                  src="/images/image.png"
                  alt="Google"
                  width={28}
                  height={28}
                />
              </button>
              <button
                type="button"
                aria-label="Login with Facebook"
                className="flex w-full items-center justify-center rounded-md bg-neutral-800 p-3 hover:bg-neutral-700 transition"
              >
                <Facebook size={28} className="text-[#1877F2]" />
              </button>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
}
