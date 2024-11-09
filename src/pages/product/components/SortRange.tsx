import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/pages/common/ui/select";

interface SortRangeProps {
  handleSortChange: (value: string) => void;
}

export const SortRange: React.FC<SortRangeProps> = ({ handleSortChange }) => {
  return (
    <Select onValueChange={handleSortChange}>
      <SelectTrigger
        id="sort-select"
        className="border border-gray-300 rounded p-4"
      >
        <SelectValue placeholder="정렬 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">최신순</SelectItem>
        <SelectItem value="oldest">오래된 순</SelectItem>
        <SelectItem value="priceAsc">가격 오름차순</SelectItem>
        <SelectItem value="priceDesc">가격 내림차순</SelectItem>
        <SelectItem value="titleAsc">타이틀 오름차순</SelectItem>
        <SelectItem value="titleDesc">타이틀 내림차순</SelectItem>
      </SelectContent>
    </Select>
  );
};
