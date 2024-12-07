import React from "react";
import { useSearchParams } from "react-router-dom";
import { useFilterStore } from "@/store/filter/useFilterStore";

export const SortRange: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSortOption } = useFilterStore();

  const handleSortChange = (value: string) => {
    setSortOption(value);

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("sort", value);
    setSearchParams(updatedParams);
  };

  return (
    <div className="relative">
      <select
        id="sort-select"
        name="filter"
        onChange={(e) => handleSortChange(e.target.value)}
        className="border border-gray-300 rounded py-2 bg-gray-900 text-white"
        defaultValue={searchParams.get("sort") || "latest"}
      >
        <option value="" disabled>
          정렬 선택
        </option>
        <option value="latest">최신순</option>
        <option value="oldest">오래된 순</option>
        <option value="priceAsc">가격 오름차순</option>
        <option value="priceDesc">가격 내림차순</option>
        <option value="titleAsc">타이틀 오름차순</option>
        <option value="titleDesc">타이틀 내림차순</option>
      </select>
    </div>
  );
};
