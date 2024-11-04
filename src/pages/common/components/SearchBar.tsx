import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const SearchBar = () => {
  return (
    <div className="flex justify-between items-center">
      <Search className=" text-gray-400" />
      <Input
        type="search"
        placeholder="상품 검색..."
        className="pl-10 border-2 border-gray-700 w-full  text-white"
      />
    </div>
  );
};
