"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/lib/validation/forgotPasswordSchema";
import type { ForgotPasswordFields } from "@/types/auth";

import clsx from "clsx";
import RHFSubmitButton from "@/components/ui/form/RHFSubmitButton";
import RHFTextField from "@/components/ui/Input/RHFTextField";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const form = useForm<ForgotPasswordFields>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      type: "email",
      email: "",
      phone: "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
    setValue,
  } = form;

  const currentType = watch("type");

  const switchType = (newType: "email" | "phone") => {
    setValue("type", newType);
    if (newType === "email") {
      setValue("phone", "");
    } else {
      setValue("email", "");
    }
  };

  const onSubmit: SubmitHandler<ForgotPasswordFields> = async (data) => {
    const value = data.type === "email" ? data.email : data.phone;

    await new Promise((r) => setTimeout(r, 1000));

    // OTP ساختگی در localStorage ذخیره می‌شود
    const fakeOtp = "123456";
    localStorage.setItem("otp", fakeOtp);

    router.push(
      `/verify?type=${encodeURIComponent(data.type)}&value=${encodeURIComponent(value)}`
    );
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto space-y-6 p-6"
        noValidate
      >
        <div className="space-y-4 mb-10">
          <div className="flex justify-center mb-2">
            <Image
              src="/images/logo/Evenjo.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>

          <h1 className="w-full text-xl flex justify-center items-center">
            Forgot your password?
          </h1>

          <p className="mb-8 md:mb-5 text-center text-neutral-400 text-sm">
            Please enter the{" "}
            {currentType === "email" ? "email address" : "phone number"}{" "}
            associated with your account and we&apos;ll send you a verification
            code.
          </p>
        </div>

        <div className="space-y-8 flex flex-col">
          <div className="flex bg-neutral-800 rounded-md overflow-hidden p-1">
            {(["email", "phone"] as const).map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => switchType(val)}
                className={clsx(
                  "flex-1 px-4 py-2 rounded-md border text-sm transition border-none",
                  currentType === val
                    ? "bg-neutral-700 text-white border-neutral-700"
                    : "bg-transparent text-white hover:bg-neutral-800"
                )}
              >
                {val === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          <input type="hidden" {...form.register("type")} />

          {currentType === "email" ? (
            <RHFTextField
              name="email"
              label="Email Address"
              placeholder="you@example.com"
              type="email"
              maxLength={64}
              autoComplete="email"
            />
          ) : (
            <RHFTextField
              name="phone"
              label="Phone Number"
              placeholder="9123456789"
              type="tel"
              maxLength={11}
              autoComplete="tel"
            />
          )}

          <RHFSubmitButton isLoading={isSubmitting}>
            Get verification code
          </RHFSubmitButton>
        </div>
      </form>
    </FormProvider>
  );
}
