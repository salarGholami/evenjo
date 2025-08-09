// components/ui/form/RHFSubmitButton.tsx
import { Loader2 } from "lucide-react";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Button from "../Button/Button";

type RHFSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  children: ReactNode;
};

export default function RHFSubmitButton({
  isLoading,
  children,
  disabled,
  ...props
}: RHFSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading || disabled}
      leftIcon={
        isLoading ? <Loader2 className="animate-spin" size={16} /> : undefined
      }
    className="w-full p-3"
      {...props}
    >
      {children}
    </Button>
  );
}
