import { RootErrorHandler } from "@/pages/common/components/RootErrorHandler";
import { RootSuspence } from "@/pages/common/components/RootSuspence";

import { Outlet } from "react-router-dom";

export const CommonLayout = () => (
  <RootErrorHandler>
    <RootSuspence>
      <Outlet />
    </RootSuspence>
  </RootErrorHandler>
);
