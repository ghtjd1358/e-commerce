import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "../../error/ErrorPage";

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
