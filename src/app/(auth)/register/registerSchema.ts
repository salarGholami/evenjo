import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  type: yup
    .mixed<"email" | "phone">()
    .oneOf(["email", "phone"], "Type must be email or phone")
    .required("Type is required"),
  email: yup
    .string()
    .email("Invalid email")
    .when("type", {
      is: "email",
      then: (schema) => schema.required("Email is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  phone: yup.string().when("type", {
    is: "phone",
    then: (schema) =>
      schema
        .matches(/^\d{10,12}$/, "Phone number must be 10 to 12 digits")
        .required("Phone number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;

export type TabType = "email" | "phone";
