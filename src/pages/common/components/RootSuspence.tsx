import { LoadingPage } from "@/pages/loading";
import { ReactNode, Suspense } from "react";

interface RootSuspenseProps {
  children: ReactNode;
}

export const RootSuspence: React.FC<RootSuspenseProps> = ({ children }) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};
