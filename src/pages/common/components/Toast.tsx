import React from "react";

import { useToastStore } from "@/store/toast/useToastStore";
import { ToastItem } from "./ToastItem";

export const Toast: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed bottom-5 right-2 z-50 flex flex-col items-center space-y-2 mt-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
