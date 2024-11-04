import { ALL_CATEGORY_ID } from "@/shared/constants";
import { db, storage } from "@/app/firebase";
import { ProductFilter } from "../../store/product/type";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { IProduct, NewProductDTO, PaginatedProductsDTO } from "./type";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

// 필터 적용
export const fetchFilterProductsApi = async (
  filter: ProductFilter,
  pageSize: number,
  page: number,
): Promise<PaginatedProductsDTO> => {
  try {
    let q = query(collection(db, "products"));

    // 정렬 옵션 적용
    if (filter.sortOption === "latest") {
      q = query(q, orderBy("updatedAt", "desc"));
    } else if (filter.sortOption === "oldest") {
      q = query(q, orderBy("updatedAt", "asc"));
    } else if (filter.sortOption === "priceAsc") {
      q = query(q, orderBy("productPrice", "asc"));
    } else if (filter.sortOption === "priceDesc") {
      q = query(q, orderBy("productPrice", "desc"));
    } else if (filter.sortOption === "titleAsc") {
      q = query(q, orderBy("productName", "asc"));
    } else if (filter.sortOption === "titleDesc") {
      q = query(q, orderBy("productName", "desc"));
    }

    // 카테고리 필터 적용
    if (filter.categoryId && filter.categoryId !== ALL_CATEGORY_ID) {
      q = query(q, where("productCategory.id", "==", filter.categoryId));
    }

    // 제목 필터 적용
    if (filter.title && filter.title.length > 0) {
      q = query(
        q,
        where("productName", ">=", filter.title[0]),
        where("productName", "<=", filter.title[0] + "\uf8ff"),
      );
    }

    // 가격 필터 적용
    if (filter.minPrice) {
      q = query(q, where("productPrice", ">=", Number(filter.minPrice)));
    }
    if (filter.maxPrice) {
      q = query(q, where("productPrice", "<=", Number(filter.maxPrice)));
    }

    // 데이터 쿼리 실행
    const querySnapshot = await getDocs(q);
    let products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: String(data.id),
        sellerId: data.sellerId,
        productQuantity: Number(data.productQuantity),
        productDescription: data.productDescription,
        productName: data.productName,
        productPrice: Number(data.productPrice),
        productCategory: data.productCategory,
        productImage: data.productImage || "",
        createdAt: data.createdAt?.toDate().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString(),
      };
    }) as IProduct[];

    if (filter.title) {
      products = products.filter((product) =>
        product.productName.toLowerCase().includes(filter.title!.toLowerCase()),
      );
    }

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

// 상품 fetch 필터 적용 전
export const fetchProductsApi = async (): Promise<IProduct[]> => {
  try {
    const q = query(collection(db, "products"), orderBy("id", "desc"));

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: String(data.id),
        sellerId: data.sellerId,
        productQuantity: Number(data.productQuantity),
        productDescription: data.productDescription,
        productName: data.productName,
        productPrice: Number(data.productPrice),
        productCategory: data.productCategory,
        productImage: data.productImage || "",
        createdAt: data.createdAt?.toDate().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString(),
      };
    }) as IProduct[];

    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

// 상품 추가
export const addProductAPI = async (
  productData: NewProductDTO,
): Promise<IProduct> => {
  try {
    return await runTransaction(db, async (transaction) => {
      const productsRef = collection(db, "products");

      const newDocRef = doc(productsRef);

      const newProductData = {
        id: newDocRef.id,
        sellerId: productData.sellerId || "",
        productName: productData.productName,
        productPrice: productData.productPrice,
        productQuantity: productData.productQuantity,
        productDescription: productData.productDescription,
        productCategory: productData.productCategory,
        productImage: productData.productImage || [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

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
    await deleteDoc(productRef);
    console.log(`Product with id ${productId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};

// 상품 수정
export const updateProductAPI = async (
  productId: string,
  updatedProduct: IProduct,
  existingImageUrl?: string,
): Promise<void> => {
  try {
    if (typeof updatedProduct.productImage !== "string" && existingImageUrl) {
      const imageRef = ref(storage, existingImageUrl);
      await deleteObject(imageRef);
    }

    if (updatedProduct.productImage instanceof File) {
      const storageRef = ref(storage, `images/${productId}`);
      await uploadBytes(storageRef, updatedProduct.productImage);
      updatedProduct.productImage = [await getDownloadURL(storageRef)];
    }

    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      productName: updatedProduct.productName,
      productPrice: updatedProduct.productPrice,
      productQuantity: updatedProduct.productQuantity,
      productDescription: updatedProduct.productDescription,
      productImage: updatedProduct.productImage,
      updatedAt: serverTimestamp(),
    });

    console.log(`Product with id ${productId} updated successfully.`);
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};
