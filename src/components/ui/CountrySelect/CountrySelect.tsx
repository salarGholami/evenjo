"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Country = {
  code?: string;
  label: string;
  flag: string;
};

type Props = {
  options: Country[];
  value: Country;
  onChange: (country: Country) => void;
};

export default function CountrySelect({ options, value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    const selected = options.find((c) => c.code === code);
    if (selected) {
      onChange(selected);
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative text-sm text-white">
      {/* Trigger Button */}
      <button
        type="button"
        className="w-full flex items-center justify-between border border-neutral-700 rounded-md px-3 py-2 hover:bg-neutral-700 transition"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <Image
            src={value.flag}
            alt={value.label}
            width={20}
            height={14}
            className="rounded-sm"
          />
          <span className="truncate hidden sm:block">{value.label}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown List */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full bg-neutral-800 border border-neutral-700 rounded-md shadow-md mt-2 z-50 overflow-hidden"
          >
            {options.map((country) => (
              <li
                key={country.code}
                onClick={() => handleSelect(country.code!)}
                tabIndex={0}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-200 hover:bg-tint-500 focus:bg-tint-500 focus:outline-none"
              >
                <Image
                  src={country.flag}
                  alt={country.label}
                  width={20}
                  height={14}
                  className="rounded-sm"
                />
                <span className="truncate">{country.label}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
