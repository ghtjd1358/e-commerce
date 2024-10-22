import { CartButton } from "./CartButton";
import { LoginButton } from "./LoginButton";
import { ProfileButton } from "./ProfileButton";
import { LogoutButton } from "./LogoutButton";
import { Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Header = ({ isLogin, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-800 pt-4 pb-4 pl-6 pr-6 flex justify-between items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="text-yellow-500 w-8 h-8" />
        </button>

        {isOpen && (
          <div className="fixed left-0 top-0 h-full w-64 bg-gray-700 p-4">
            <h2 className="text-yellow-500 mb-4">카테고리</h2>
            <Link
              to="/category/clothes"
              className="block p-2 hover:bg-yellow-500 transition-colors"
            >
              옷
            </Link>
            <Link
              to="/category/bags"
              className="block p-2 hover:bg-yellow-500 transition-colors"
            >
              백
            </Link>
            <Link
              to="/category/shoes"
              className="block p-2 hover:bg-yellow-500 transition-colors"
            >
              신발
            </Link>
          </div>
        )}

        <div className="flex items-center w-[600px] h-[60px] mx-auto">
          <h1 className="text-3xl font-bold text-yellow-500 tracking-widest mr-4 flex-grow-0 flex-shrink-0">
            이커머스
          </h1>
          <div className="relative flex-grow mr-5">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="상품 검색..."
              className="pl-10 border-2 border-gray-700 w-full h-10 text-white"
            />
          </div>
        </div>

        <div className="flex justify-between items-center ml-6 p-1 w-60">
          <CartButton />
          <ProfileButton user={user} isLogin={isLogin} />
          {isLogin ? <LogoutButton /> : <LoginButton />}
        </div>
      </header>
    </>
  );
};
