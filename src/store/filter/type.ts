export interface FilterStore {
  minPrice: number;
  maxPrice: number;
  title: string;
  categoryId: string;
  sortOption: string;
  order: string;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setTitle: (title: string) => void;
  setCategoryId: (categoryId: string) => void;
  setSortOption: (option: string) => void;
  setOrder: (order: string) => void;
  resetFilter: () => void;
}
