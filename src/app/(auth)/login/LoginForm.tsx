"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { Apple, Facebook } from "lucide-react";

import { loginSchema, LoginFormValues, TabType } from "./validation";
import RHFTextField from "@/components/ui/Input/RHFTextField";
import { useRouter } from "next/navigation";

export default function LoginForm({
  onSubmit,
}: {
  onSubmit?: (data: LoginFormValues) => void;
}) {
  const [tab, setTab] = useState<TabType>("email");
  const router = useRouter();

  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      type: tab,
    },
  });

  useEffect(() => {
    methods.reset(
      {
        email: "",
        phone: "",
        password: "",
        type: tab,
      },
      { keepErrors: true }
    );
  }, [tab, methods]);

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => onSubmit?.(data))}
        className="w-full text-white "
        noValidate
      >
        <div className="flex justify-center mb-2">
          <Image
            src="/images/logo/Evenjo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>

        <p className="mb-8 md:mb-5 text-center text-neutral-400 text-sm">
          Please enter your {tab === "email" ? "email" : "phone number"} to
          login
        </p>

        <div className="flex justify-center mb-8 bg-neutral-900 rounded-md p-1">
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

        <div className="space-y-4">
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
            />
          ) : (
            <RHFTextField
              name="phone"
              label="Phone Number"
              placeholder="(912)1234567"
              type="tel"
              maxLength={10}
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
          />
        </div>

        <div className="flex justify-between text-sm text-neutral-400 my-2 mb-8">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" className="accent-tint-500" />
            Remember me
          </label>
          <button
            type="button"
            className="hover:text-white"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full rounded-md py-3 font-semibold transition-colors ${
            !isValid || isSubmitting
              ? "bg-tint-600 cursor-not-allowed"
              : "bg-tint-500 hover:bg-tint-600"
          }`}
        >
          Log in
        </button>

        <p className="mt-4 text-center text-xs text-neutral-400">
          New to Evenjo?{" "}
          <a href="/register" className="text-tint-400 hover:underline">
            Create account
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
