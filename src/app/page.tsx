"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-hot-toast";
import RHFTextField from "@/components/ui/Input/input";

type FormValues = {
  username: string;
};

export default function Home() {
  const methods = useForm<FormValues>({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    toast.success(`Submitted: ${data.username}`);
  };

  return (
    <div className="container xl:max-w-screen-xl mx-auto px-4 py-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-md space-y-6 p-6 rounded-xl shadow"
        >
          <RHFTextField
            name="label"
            label="Label"
            maxLength={20}
            showCharCount={true}
            type="text"
            placeholder="placeholder"
          />
        </form>
      </FormProvider>
    </div>
  );
}
