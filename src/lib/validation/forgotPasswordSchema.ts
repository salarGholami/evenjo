import * as yup from "yup";
import type { ForgotPasswordFields } from "@/types/auth";

export const forgotPasswordSchema: yup.ObjectSchema<ForgotPasswordFields> = yup
  .object({
    type: yup
      .mixed<"email" | "phone">()
      .oneOf(["email", "phone"])
      .required("Type is required"),

    email: yup.string().when("type", {
      is: "email",
      then: (schema) =>
        schema.email("Invalid email").required("Email is required"),
      otherwise: (schema) =>
        schema.test("empty-email", "Must be empty", (val) => val === ""),
    }),

    phone: yup.string().when("type", {
      is: "phone",
      then: (schema) =>
        schema
          .matches(/^(\+98|0)?9\d{9}$/, "Invalid phone number")
          .required("Phone number is required"),
      otherwise: (schema) =>
        schema.test("empty-phone", "Must be empty", (val) => val === ""),
    }),
  })
  .required() as yup.ObjectSchema<ForgotPasswordFields>;
