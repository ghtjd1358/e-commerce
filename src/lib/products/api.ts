import { ALL_CATEGORY_ID } from "@/constants";
import { db, storage } from "@/firebase";
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

// fetch data, filter 적용
export const fetchFilterProductsApi = async (
  filter: ProductFilter,
  pageSize: number,
  page: number,
): Promise<PaginatedProductsDTO> => {
  try {
    // 쿼리 초기화: products 컬렉션을 id 필드를 기준으로 내림차순 정렬
    let q = query(collection(db, "products"), orderBy("id", "desc"));
    // filter.categoryId가 존재하고 전체 카테고리(ALL_CATEGORY_ID)가 아닌 경우,
    // productCategory.id 필드가 filter.categoryId와 일치하는 항목
    if (filter.categoryId && filter.categoryId !== ALL_CATEGORY_ID) {
      q = query(q, where("productCategory.id", "==", filter.categoryId));
    }

    // Firestore의 문자열 쿼리는 특정 문자로 시작하는 항목을 찾을 때 유용,
    // 그래서 >=와 <= 연산자를 사용하여 제목이 filter.title[0]에서 시작하는 항목

    // where 조건을 만족하려면 index 설정해줘야함
    if (filter.title && filter.title.length > 0) {
      q = query(
        q,
        where("productName", ">=", filter.title[0]),
        where("productName", "<=", filter.title[0] + "\uf8ff"),
      );
    }

    if (filter.minPrice) {
      q = query(q, where("productPrice", ">=", Number(filter.minPrice)));
    }
    if (filter.maxPrice) {
      q = query(q, where("productPrice", "<=", Number(filter.maxPrice)));
    }

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

      // 새 문서 참조를 생성하되, ID를 명시적으로 지정하지 않음
      const newDocRef = doc(productsRef); // 자동으로 생성된 ID 사용

      const newProductData = {
        id: newDocRef.id, // 자동 생성된 ID 사용
        sellerId: productData.sellerId || "",
        productName: productData.productName,
        productPrice: productData.productPrice,
        productQuantity: productData.productQuantity,
        productDescription: productData.productDescription,
        productCategory: productData.productCategory,
        productImage: productData.productImage || "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      transaction.set(newDocRef, newProductData); // 상품 추가

      return {
        ...newProductData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Error adding product: ", error); // 에러 확인
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
      updatedProduct.productImage = await getDownloadURL(storageRef);
    }

    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      productName: updatedProduct.productName,
      productPrice: updatedProduct.productPrice,
      productQuantity: updatedProduct.productQuantity,
      productDescription: updatedProduct.productDescription,
      productImage: updatedProduct.productImage, // string or new image URL
      updatedAt: serverTimestamp(),
    });

    console.log(`Product with id ${productId} updated successfully.`);
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};
