import { categories } from "@/constants";
import { NewProductDTO } from "@/lib/products/type";

interface User {
  uid: string;
}

export const createNewProduct = (
  product: NewProductDTO,
  imageUrl: string,
  user: User | null,
) => {
  console.log("프로덕트", product);

  const categoryObj = categories.find(
    (cat) => cat.id === product.productCategory.id,
  );

  return {
    ...product,
    sellerId: user?.uid,
    productPrice: Number(product.productPrice),
    productQuantity: Number(product.productQuantity),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productCategory: categoryObj
      ? { id: categoryObj.id, name: categoryObj.name }
      : { id: "0", name: "Unknown" },
    productImage: imageUrl,
  };
};

export const initialProductState: NewProductDTO = {
  sellerId: "",
  productName: "",
  productPrice: 0,
  productQuantity: 0,
  productDescription: "",
  productCategory: { id: "", name: "" },
  productImage: undefined,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
