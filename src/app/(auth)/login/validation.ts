import * as yup from "yup";

export type TabType = "email" | "phone";

export type LoginFormValues = {
  email?: string;
  phone?: string;
  password: string;
  type: TabType;
};

export const loginSchema: yup.ObjectSchema<LoginFormValues> = yup.object({
  type: yup
    .mixed<TabType>()
    .oneOf(["email", "phone"])
    .required("Login method is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .when("type", {
      is: "email",
      then: (schema) => schema.required("Email is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  phone: yup
    .string()
    .matches(/^\+\d{10,15}$/, "Phone number must be in format +1234567890")
    .when("type", {
      is: "phone",
      then: (schema) => schema.required("Phone number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/[a-z]/, "Must include a lowercase letter")
    .matches(/[A-Z]/, "Must include an uppercase letter")
    .matches(/[@$!%*?&]/, "Must include a special character"),
});
