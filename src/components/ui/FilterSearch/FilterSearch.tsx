"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type FilterField = {
  name: string;
  label: string;
  options: Option[];
  icon?: React.ReactNode;
};

interface FilterSearchProps {
  fields: FilterField[];
  onSearch: (filters: Record<string, string>) => void;
}

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const optionVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.03 },
  }),
};

const FilterSearch: React.FC<FilterSearchProps> = ({ fields, onSearch }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [openField, setOpenField] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setOpenField(null);
  };

  const handleRemove = (name: string) => {
    setFilters((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  const handleSubmit = () => {
    onSearch(filters);
  };

  const getLabelForValue = (name: string, value: string) => {
    const field = fields.find((f) => f.name === name);
    const option = field?.options.find((opt) => opt.value === value);
    return option?.label || value;
  };

  const selectedTags = Object.entries(filters)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value)
    .map(([key, value]) => ({
      name: key,
      label: getLabelForValue(key, value),
    }));

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-black text-white p-4 rounded-lg space-y-4">
      <div
        className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end"
        ref={wrapperRef}
      >
        {fields.map(({ name, label, options, icon }) => {
          const selectedValue = filters[name];
          const selectedOption = options.find((o) => o.value === selectedValue);

          return (
            <div key={name} className="relative">
              <label className="text-sm font-medium block mb-1">{label}</label>

              <div
                className="relative bg-zinc-900 text-white rounded-md px-3 py-2 cursor-pointer flex items-center justify-between"
                onClick={() =>
                  setOpenField((prev) => (prev === name ? null : name))
                }
              >
                <div className="flex items-center gap-2 truncate">
                  {icon && <span className="text-white/70">{icon}</span>}
                  <span className="text-sm">
                    {selectedOption ? selectedOption.label : "Select"}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openField === name ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </div>

              <AnimatePresence>
                {openField === name && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    transition={{ duration: 0.2 }}
                    className="absolute mt-1 z-20 bg-zinc-800 rounded-md shadow-md text-sm overflow-hidden w-full"
                  >
                    {options.map((opt, i) => (
                      <motion.div
                        key={opt.value}
                        custom={i}
                        variants={optionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={() => handleChange(name, opt.value)}
                        className={`px-4 py-2 hover:bg-zinc-700 cursor-pointer ${
                          filters[name] === opt.value
                            ? "bg-zinc-700 text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {opt.label}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* دکمه سرچ */}
        <button
          className="bg-tint-500 hover:bg-tint-400 transition text-white rounded-md p-2 flex justify-center items-center gap-2 col-span-2 md:col-span-1 cursor-pointer"
          onClick={handleSubmit}
        >
          <Search size={16} className="rotate-90" />
          Search
        </button>
      </div>

      {/* تگ‌های انتخاب‌شده */}
      {selectedTags.length > 0 && (
        <div className="text-sm text-gray-400 flex flex-wrap gap-2 mt-2">
          <span className="text-white/60">Your search:</span>
          {selectedTags.map((tag) => (
            <span
              key={tag.name}
              className="bg-zinc-800 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"
            >
              {tag.label}
              <button
                onClick={() => handleRemove(tag.name)}
                className="hover:text-error-300 hover:border-error-300 hover:border hover:rounded-full p-0.5"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSearch;
