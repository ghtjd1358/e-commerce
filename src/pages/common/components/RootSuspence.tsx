import { ReactNode, Suspense } from "react";
import { LoadingPage } from "../../loading";

interface RootSuspenseProps {
  children: ReactNode;
}

export const RootSuspence: React.FC<RootSuspenseProps> = ({ children }) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};
