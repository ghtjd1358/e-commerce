import { Link } from "react-router-dom";
import { ProfileButton } from "./ProfileButton";
import { X } from "lucide-react";
import { CartButton } from "./CartButton";
import { pageRoutes } from "@/app/apiRouters";
import { Button } from "../ui/button";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";

interface SideNavigationBarProps {
  user?: { uid: string; photoURL?: string | null; nickname?: string } | null;
  isLogin: boolean;
  cartLength: number;
  initCart: (uid: string) => void;
  resetCart: (uid: string) => void;
  toggleModal: () => void;
}

export const SideNavigationBar: React.FC<SideNavigationBarProps> = ({
  user,
  isLogin,
  cartLength,
  initCart,
  resetCart,
  toggleModal,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-700 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <Link
            to={pageRoutes.main}
            className="text-yellow-500 text-xl font-bold tracking-widest"
          >
            <h1>이커머스</h1>
          </Link>
          <ProfileButton user={user} isLogin={isLogin} />
          <Button onClick={toggleModal} aria-label="Close menu">
            <X className="text-yellow-500 w-6 h-6" />
          </Button>
        </div>
        <div className="mb-6 space-y-2">
          <CartButton user={user} cartLength={cartLength} initCart={initCart} resetCart={resetCart} />
        </div>
        <h3 className="text-yellow-500 mb-4 font-semibold">카테고리</h3>
        <nav className="space-y-2 flex-grow">
          <Link
            to="/category/clothes"
            className="block p-2 hover:bg-yellow-500 hover:text-gray-800 transition-colors rounded"
          >
            옷
          </Link>
          <Link
            to="/category/bags"
            className="block p-2 hover:bg-yellow-500 hover:text-gray-800 transition-colors rounded"
          >
            백
          </Link>
          <Link
            to="/category/shoes"
            className="block p-2 hover:bg-yellow-500 hover:text-gray-800 transition-colors rounded"
          >
            신발
          </Link>
        </nav>
        <div className="flex">
          {isLogin ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </div>
  );
};
