import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { IProduct } from "@/features/products/type";
import { useFetchSearchProducts } from "@/features/products/hooks/useSearchProducts";

interface SearchBarProps {
  onSearchResults: (results: IProduct[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: searchResults } = useFetchSearchProducts(searchTerm);

  useEffect(() => {
    if (searchResults) {
      onSearchResults(searchResults);
    }
  }, [searchResults, onSearchResults]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Search className="text-gray-400" />
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="상품 검색..."
          className="pl-10 border-2 border-gray-700 w-full text-white"
        />
      </div>
    </div>
  );
};
