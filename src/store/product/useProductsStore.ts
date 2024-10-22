import { create } from "zustand";
import { ProductStore } from "./type";

export const useProductStore = create<ProductStore>(() => ({
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,
}));
