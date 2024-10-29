import { CartButton } from "./CartButton";
import { LoginButton } from "./LoginButton";
import { ProfileButton } from "./ProfileButton";
import { LogoutButton } from "./LogoutButton";
import { Menu, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useModal } from "@/hooks/useModals";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { pageRoutes } from "@/apiRouters";

export const NavigationBar: React.FC = () => {
  const { isOpen, toggleModal } = useModal();
  const { isLogin, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <header className="bg-gray-800 pt-4 pb-4 pl-6 pr-6 flex justify-between items-center">
      <button onClick={toggleModal}>
        <Menu className="text-yellow-500 w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
          <div className="fixed left-0 top-0 h-full w-64 bg-gray-700 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <Link
                to={pageRoutes.main}
                className="text-yellow-500 text-xl font-bold tracking-widest"
              >
                <h1>이커머스</h1>
              </Link>
              <ProfileButton />
              <Button onClick={toggleModal} aria-label="Close menu">
                <X className="text-yellow-500 w-6 h-6" />
              </Button>
            </div>

            <div className="mb-6 space-y-2">
              <CartButton />
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

            {/* Place LogoutButton or LoginButton at the bottom */}
            <div className="flex">
              {isLogin ? <LogoutButton /> : <LoginButton />}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center w-[600px] h-[50px] mx-auto">
        <Link
          className="text-3xl font-bold text-yellow-500 tracking-widest flex-grow text-center ml-20 -mr-10"
          to={pageRoutes.main}
        >
          <h1>이커머스</h1>
        </Link>

        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="상품 검색..."
            className="pl-10 border-2 border-gray-700 w-full h-10 text-white"
          />
        </div>
      </div>

      <div className="flex justify-between items-center ml-6 p-1 w-60">
        <div className="flex-grow flex justify-around">
          <CartButton />

          <ProfileButton />
          {isLogin ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </header>
  );
};
