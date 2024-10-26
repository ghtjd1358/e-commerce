export interface IProduct {
  id: string;
  sellerId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productCategory: { id: string; name: string };
  productImage: string | File | (string | null)[];
  createdAt: string;
  updatedAt: string;
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
  productImage?: (string | null)[];
  createdAt: string;
  updatedAt: string;
}
