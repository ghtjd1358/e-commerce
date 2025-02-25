export interface CartStore {
  cart: CartItem[];
  totalCount: number;
  totalPrice: number;

  initCart: (userId: string) => void;
  resetCart: (userId: string) => void;
  addCartItem: (item: CartItem, userId: string, count: number) => void;
  removeCartItem: (itemId: string, userId: string) => void;
  changeCartItemCount: (itemId: string, count: number, userId: string) => void;
  selectCartItem: (itemId: string) => void;
  selectAllCartItems: (selectAll: boolean) => void;
}

export interface CartItem {
  id: string;
  productImage: string[];
  productName: string;
  productPrice: number;
  productCategory:{
    name : string; 
  };
  count: number;
  isSelected?: boolean;
}

export interface Total {
  totalCount: number;
  totalPrice: number;
}
