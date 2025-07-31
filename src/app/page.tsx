"use client";
import FilterSearch from "@/components/ui/FilterSearch/FilterSearch";
import { Dribbble, MapPin, Calendar, DollarSign } from "lucide-react";

const Page = () => {
  const fields = [
    {
      name: "category",
      label: "What",
      icon: <Dribbble size={16} />,
      options: [
        { label: "Sport", value: "sport" },
        { label: "Music", value: "music" },
      ],
    },
    {
      name: "location",
      label: "Where",
      icon: <MapPin size={16} />,
      options: [
        { label: "Texas", value: "texas" },
        { label: "California", value: "california" },
      ],
    },
    {
      name: "time",
      label: "When",
      icon: <Calendar size={16} />,
      options: [
        { label: "This weekend", value: "this_weekend" },
        { label: "Next month", value: "next_month" },
      ],
    },
    {
      name: "price",
      label: "Price",
      icon: <DollarSign size={16} />,
      options: [
        { label: "$200", value: "200" },
        { label: "$500", value: "500" },
      ],
    },
  ];

  const handleSearch = (filters: Record<string, string>) => {
    console.log(filters);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <FilterSearch fields={fields} onSearch={handleSearch} />
    </div>
  );
};

export default Page;
