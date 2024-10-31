export interface IProduct {
  id: string;
  sellerId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productCategory: { id: string; name: string };
  productImage: string[];
  createdAt: string;
  updatedAt: string;
  count?: number | undefined;
}
export interface PaginatedProductsDTO {
  products: IProduct[];
  hasNextPage: boolean;
  totalCount: number;
  nextPage?: number;
}

export interface NewProductDTO {
  sellerId: string | undefined;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productCategory: { id: string; name: string };
  productImage?: string[];
  createdAt: string;
  updatedAt: string;
}
