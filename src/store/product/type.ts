import { IProduct } from "../../lib/products/type";

export interface ProductFilter {
  categoryId: string;
  title?: string;
  minPrice?: number;
  maxPrice?: number;
  sortOption?: string;
  order?: string;
}

export interface ProductSliceState {
  items: IProduct[];
  hasNextPage: boolean;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

export interface ProductStore {
  items: IProduct[];
  hasNextPage: boolean;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  sortOption?: string;
  order?: string;
}
