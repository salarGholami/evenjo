"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

type Country = {
  code: string;
  label: string;
  flag: string;
};

type Props = {
  options: Country[];
  value: Country;
  onChange: (country: Country) => void;
};

export default function CountrySelect({ options, value, onChange }: Props) {
  return (
    <div className="relative inline-block text-left">
      <select
        value={value.code}
        onChange={(e) => {
          const selected = options.find((c) => c.code === e.target.value);
          if (selected) onChange(selected);
        }}
        className="appearance-none bg-transparent pr-6 pl-8 py-1 rounded-md hover:bg-Neutral-700  cursor-pointer text-sm text-white"
        style={{ WebkitAppearance: "none" }}
      >
        {options.map((country) => (
          <option
            key={country.code}
            value={country.code}
            className="text-black bg-tint-100"
          >
            {country.label}
          </option>
        ))}
      </select>

      {/* Flag overlay */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
        <Image
          src={value.flag}
          alt={value.code}
          width={20}
          height={14}
          className="rounded-sm"
        />
      </div>

      {/* Chevron overlay */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDown size={14} className="text-white" />
      </div>
    </div>
  );
}
