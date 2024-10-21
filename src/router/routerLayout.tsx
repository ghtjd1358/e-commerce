import { Layout } from "@/pages/common/components/Layout";
import { RootErrorHandler } from "@/pages/common/components/RootErrorHandler";
import { RootSuspence } from "@/pages/common/components/RootSuspence";
import { Outlet } from "react-router-dom";

export const CommonLayout = () => (
  <RootErrorHandler>
    <RootSuspence>
      <div className="flex">
        <Layout>
          <Outlet />
        </Layout>
      </div>
    </RootSuspence>
  </RootErrorHandler>
);

export const AuthLayout = () => (
  <RootErrorHandler>
    <RootSuspence>
      <Outlet />
    </RootSuspence>
  </RootErrorHandler>
);
