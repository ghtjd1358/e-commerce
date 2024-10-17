import { pageRoutes } from "@/apiRouters";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerClassName = "",
}) => {
  return <div>Layout</div>;
};
