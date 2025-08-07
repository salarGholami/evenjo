// ui/form/RHFPhoneField.tsx

import RHFTextField, { RHFTextFieldProps } from "../Input/RHFTextField";



export default function RHFPhoneField(props: Omit<RHFTextFieldProps, "type">) {
  return <RHFTextField {...props} type="tel" />;
}
