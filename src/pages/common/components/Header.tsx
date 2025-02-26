import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useModal } from "@/shared/hooks/useModals";
import { useCartStore } from "@/store/cart/useCartStore";
import { SideNavigationBar } from "./SideNavigationBar";
import { CartButton } from "./CartButton";
import { ProfileButton } from "./ProfileButton";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { LogoButton } from "./LogoButton";
import { Button } from "../ui/button";
import { CartModal } from "./CartModal";
import { SearchBar } from "./SearchBar";

export const Header: React.FC = () => {
  const { isOpen, toggleModal } = useModal();
  const { user, isLogin } = useAuthStore();
  const { cart, initCart, resetCart } = useCartStore();
  const cartLength = cart.length;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-10 flex items-center justify-between px-4 py-3 md:px-8 md:py-4 h-[60px] ${
        isScrolled
          ? "border-b border-orange-500 bg-gray-50 duration-300"
          : "bg-transparent border-none"
      }`}
    >
      <div className="w-full">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          {/* 모바일 메뉴 버튼 */}
          <Button
            onClick={toggleModal}
            className="text-yellow-500 md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-8 h-8" />
          </Button>

          {/* 로고 */}
          <div>
            <LogoButton className="text-3xl font-bold text-center md:text-left" />
          </div>
          {/* 사이드 내비게이션 바 */}
          {isOpen && (
            <SideNavigationBar
              user={user}
              isLogin={isLogin}
              cartLength={cartLength}
              initCart={initCart}
              resetCart={resetCart}
              toggleModal={toggleModal}
            />
          )}
          <div className="hidden md:flex items-center">
            <SearchBar onSearchResults={(results) => console.log(results)} />
            <CartButton
              user={user}
              cartLength={cartLength}
              initCart={initCart}
              resetCart={resetCart}
            />
            <ProfileButton user={user} isLogin={isLogin} />
            {isLogin ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
      <CartModal />
    </header>
  );
};
