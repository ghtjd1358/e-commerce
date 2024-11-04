import { ErrorPage } from "@/pages/error/ErrorPage";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface RootErrorBoundaryProps {
  children: ReactNode;
}

export const RootErrorHandler: React.FC<RootErrorBoundaryProps> = ({
  children,
}) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
  );
};
