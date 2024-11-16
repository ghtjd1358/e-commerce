interface SortRangeProps {
  handleSortChange: (value: string) => void;
}

export const SortRange: React.FC<SortRangeProps> = ({ handleSortChange }) => {
  return (
    <div className="relative">
      <select
        id="sort-select"
        name="filter"
        onChange={(e) => handleSortChange(e.target.value)}
        className="border border-gray-300 rounded py-2 bg-gray-900 text-white"
        defaultValue="latest"
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
