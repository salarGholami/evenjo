"use client";

import React, { useState } from "react";

type GenreFilterProps = {
  genres: string[]; // لیست ژانرها
  defaultGenre?: string; // انتخاب اولیه (پیش‌فرض "All")
  title?: string; // عنوان بخش، پیش‌فرض "Filter"
  onSelect?: (genre: string) => void; // هندلر انتخاب ژانر
  showSeeAll?: boolean; // دکمه "See All" نمایش داده بشه یا نه
};

const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  defaultGenre = "All",
  title = "Filter",
  onSelect,
  showSeeAll = true,
}) => {
  const [selected, setSelected] = useState(defaultGenre);

  const handleSelect = (genre: string) => {
    setSelected(genre);
    onSelect?.(genre);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        {showSeeAll && (
          <button className="text-sm text-neutral-400 hover:text-white cursor-pointer">
            See all
          </button>
        )}
      </div>

      {/* Scrollable Filter */}
      <div className="mt-4 overflow-x-auto no-scrollbar px-4">
        <div className="flex gap-2 w-max">
          {genres.map((genre, index) => {
            const isActive = selected === genre;
            return (
              <button
                key={index}
                onClick={() => handleSelect(genre)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm border border-transparent transition-all cursor-pointer
                  ${
                    isActive
                      ? "bg-tint-600 text-white"
                      : "bg-neutral-800 text-white/70 hover:bg-neutral-700"
                  }
                `}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;
