import { ALL_CATEGORY_ID } from "@/shared/constants";
import { FilterStore } from "./type";
import { create } from "zustand";

export const useFilterStore = create<FilterStore>((set) => ({
  minPrice: 0,
  maxPrice: 0,
  title: "",
  categoryId: ALL_CATEGORY_ID,
  sortOption: "latest",
  order: "asc",

  setMinPrice: (price: number) =>
    set((state) => ({ ...state, minPrice: price })),
  setMaxPrice: (price: number) =>
    set((state) => ({ ...state, maxPrice: price })),
  setTitle: (title: string) => set((state) => ({ ...state, title })),
  setCategoryId: (categoryId: string) =>
    set((state) => ({ ...state, categoryId })),
  setSortOption: (option: string) =>
    set((state) => ({ ...state, sortOption: option })),
  setOrder: (order: string) => set((state) => ({ ...state, order })),

  resetFilter: () =>
    set(() => ({
      minPrice: 0,
      maxPrice: 0,
      title: "",
      categoryId: ALL_CATEGORY_ID,
      sortOption: "latest",
      order: "asc",
    })),
}));
