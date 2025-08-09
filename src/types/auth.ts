export type ForgotPasswordFields =
  | { type: "email"; email: string; phone: "" }
  | { type: "phone"; phone: string; email: "" };
