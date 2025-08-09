"use client";

import { useState, useRef } from "react";

export default function OtpInput({
  length = 6,
  onChange,
}: {
  length?: number;
  onChange?: (code: string) => void;
}) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;

    if (!/^\d?$/.test(val)) return; // فقط عدد یا خالی

    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);

    onChange?.(newValues.join(""));

    if (val && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[idx]}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-10 h-12 text-center bg-neutral-900 rounded-md border border-neutral-700 text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      ))}
    </div>
  );
}
