export interface IProduct {
  id: string;
  sellerId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productCategory: string;
  productImage: string;
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
  sellerId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productCategory: string;
  productImage?: string;
  createdAt: string;
  updatedAt: string;
}
