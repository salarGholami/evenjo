"use client";

import GenreFilter from "@/components/ui/category/GenreFilter";

const Page = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <GenreFilter
        title="Shows"
        genres={[
          "All",
          "Pop",
          "Rock",
          "Jazz & Blues",
          "Hip-Hop & Rap",
          "Country",
          "Electronic",
          "Classical",
        ]}
        defaultGenre="All"
        onSelect={(genre) => console.log("Selected genre:", genre)}
        showSeeAll={true}
      />
    </div>
  );
};

export default Page;
