"use client";

import clsx from "clsx";

type InputTypeToggleProps = {
  type: "email" | "phone";
  onChange: (value: "email" | "phone") => void;
};

export function InputTypeToggle({ type, onChange }: InputTypeToggleProps) {
  return (
    <div className="flex gap-2 bg-neutral-800 rounded-md overflow-hidden p-1">
      {(["email", "phone"] as const).map((val) => {
        const isActive = type === val;
        const baseClasses =
          "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors";
        const activeClasses = "bg-neutral-700 text-white border-neutral-700";
        const inactiveClasses =
          "bg-transparent text-white hover:bg-neutral-800";

        return (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            className={clsx(
              baseClasses,
              isActive ? activeClasses : inactiveClasses
            )}
          >
            {val === "email" ? "Email" : "Phone"}
          </button>
        );
      })}
    </div>
  );
}
