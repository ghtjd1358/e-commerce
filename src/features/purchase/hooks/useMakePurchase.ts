import { CartItem } from "../../../store/cart/type";
// import { useCartStore } from "@/store/cart/useCartStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import { PurchaseDTO } from "../types";
import { pageRoutes } from "@/app/apiRouters";
import { makePurchaseAPI } from "../api";

interface MakePurchaseVariables {
  // purchaseData: PurchaseDTO;
  userId: string;
  cartData: CartItem[];
}

export const useMakePurchase = () => {
  const navigate = useNavigate();
  // const { resetCart } = useCartStore();
  const { addToast } = useToastStore();

  return useMutation<void, Error, MakePurchaseVariables>({
    mutationFn: ({ cartData, userId }) => makePurchaseAPI(cartData, userId),
    onSuccess: () => {
      // resetCart(variables.userId);
      addToast("결제 페이지로 넘어갑니다!", "success");
      navigate(pageRoutes.checkout);
    },
    onError: (error: Error) => {
      addToast("구매 중 오류가 발생했습니다.", "error");
      console.error("구매 중 오류가 발생했습니다.", error.message);
    },
  });
};

// export const useMakePurchase = () => {
//   const navigate = useNavigate();
//   const { resetCart } = useCartStore();
//   const { addToast } = useToastStore();

//   return useMutation<void, Error, MakePurchaseVariables>({
//     mutationFn: ({ cartData, userId }) => makePurchaseAPI(cartData, userId),
//     onSuccess: (_, variables) => {
//       resetCart(variables.userId);
//       addToast("결제 페이지로 넘어갑니다!", "success");
//       navigate(pageRoutes.checkout);
//     },
//     onError: (error: Error) => {
//       addToast("구매 중 오류가 발생했습니다.", "error");
//       console.error("구매 중 오류가 발생했습니다.", error.message);
//     },
//   });
// };
