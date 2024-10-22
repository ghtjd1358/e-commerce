// import { ALL_CATEGORY_ID } from "@/constants";
import { db } from "@/firebase";
// import { ProductFilter } from "../../store/product/type";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  deleteDoc,
  //   where,
} from "firebase/firestore";
import { IProduct, NewProductDTO, PaginatedProductsDTO } from "./type";

// 상품 fetch
export const fetchProducts = async (
  pageSize: number,
  page: number,
): Promise<PaginatedProductsDTO> => {
  try {
    const q = query(collection(db, "products"), orderBy("id", "desc"));

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: String(data.id),
        sellerId: data.sellerId,
        productQuantity: data.productQuantity,
        productDescription: data.productData,
        productName: data.productName,
        productPrice: Number(data.price),
        productCategory: data.productCategory,
        productImage: data.productImage || "",
        createdAt: data.createdAt?.toDate().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString(),
      };
    }) as IProduct[];

    const totalCount = products.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = products.slice(startIndex, endIndex);

    const hasNextPage = endIndex < totalCount;
    const nextPage = hasNextPage ? page + 1 : undefined;

    return { products: paginatedProducts, hasNextPage, totalCount, nextPage };
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

// export const fetchProducts = async (
//   filter: ProductFilter,
//   pageSize: number,
//   page: number,
// ): Promise<PaginatedProductsDTO> => {
//   try {
//     let q = query(collection(db, "products"), orderBy("id", "desc"));

//     if (filter.categoryId && filter.categoryId !== ALL_CATEGORY_ID) {
//       q = query(q, where("category.id", "==", filter.categoryId));
//     }

//     if (filter.title && filter.title.length > 0) {
//       q = query(
//         q,
//         where("title", ">=", filter.title[0]),
//         where("title", "<=", filter.title[0] + "\uf8ff"),
//       );
//     }

//     if (filter.minPrice) {
//       q = query(q, where("price", ">=", Number(filter.minPrice)));
//     }
//     if (filter.maxPrice) {
//       q = query(q, where("price", "<=", Number(filter.maxPrice)));
//     }

//     const querySnapshot = await getDocs(q);
//     let products = querySnapshot.docs.map((doc) => {
//       const data = doc.data();
//       return {
//         id: String(data.id),
//         title: data.title,
//         price: Number(data.price),
//         category: data.category,
//         image: data.image || "",
//         createdAt: data.createdAt?.toDate().toISOString(),
//         updatedAt: data.updatedAt?.toDate().toISOString(),
//       };
//     }) as IProduct[];

//     if (filter.title) {
//       products = products.filter((product) =>
//         product.title.toLowerCase().includes(filter.title!.toLowerCase()),
//       );
//     }

//     const totalCount = products.length;
//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const paginatedProducts = products.slice(startIndex, endIndex);

//     const hasNextPage = endIndex < totalCount;
//     const nextPage = hasNextPage ? page + 1 : undefined;

//     return { products: paginatedProducts, hasNextPage, totalCount, nextPage };
//   } catch (error) {
//     console.error("Error fetching products: ", error);
//     throw error;
//   }
// };

// 상품 추가
export const addProductAPI = async (
  productData: NewProductDTO,
): Promise<IProduct> => {
  try {
    return await runTransaction(db, async (transaction) => {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("id", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      let maxId = 0;
      if (!querySnapshot.empty) {
        maxId = parseInt(querySnapshot.docs[0].data().id);
      }

      const newId = maxId + 1;

      const newProductData = {
        id: String(newId), // 새로운 id
        sellerId: productData.sellerId,
        productName: productData.productName,
        productPrice: productData.productPrice,
        productQuantity: productData.productQuantity,
        productDescription: productData.productDescription,
        productCategory: productData.productCategory,
        productImage: productData.productImage || "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const newDocRef = doc(productsRef, String(newId));
      transaction.set(newDocRef, newProductData);

      return {
        ...newProductData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

// 삭제
export const deleteProductAPI = async (productId: string): Promise<void> => {
  try {
    const productRef = doc(db, "products", productId);

    // Firestore 문서 삭제
    await deleteDoc(productRef);
    console.log(`Product with id ${productId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};
