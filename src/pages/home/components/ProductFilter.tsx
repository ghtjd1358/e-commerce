import React from "react";
import { useFilterStore } from "@/store/filter/useFilterStore";
import { ALL_CATEGORY_ID, categories } from "@/constants";

export const ProductFilter: React.FC = () => {
  const {
    minPrice,
    maxPrice,
    title,
    categoryId,
    setMinPrice,
    setMaxPrice,
    setTitle,
    setCategoryId,
    resetFilter,
  } = useFilterStore();

  return (
    <div className="filter-component mb-6">
      <h2>필터</h2>
      <div>
        <label>최소 가격:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label>최대 가격:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label>제목:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>카테고리:</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value={ALL_CATEGORY_ID}>모두</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={resetFilter}>필터 초기화</button>
    </div>
  );
};
