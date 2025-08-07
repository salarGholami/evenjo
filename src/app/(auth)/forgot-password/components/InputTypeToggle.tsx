export function InputTypeToggle({
  type,
  onChange,
}: {
  type: "email" | "phone";
  onChange: (value: "email" | "phone") => void;
}) {
  return (
    <div className="flex gap-2">
      {(["email", "phone"] as const).map((val) => {
        const isActive = type === val;
        const baseClasses = "px-4 py-2 rounded border text-sm";
        const activeClasses = "bg-primary text-white";
        const inactiveClasses = "bg-white border-gray-300 text-gray-600";

        return (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
          >
            {val === "email" ? "Email" : "Phone"}
          </button>
        );
      })}
    </div>
  );
}
