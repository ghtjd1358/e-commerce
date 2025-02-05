import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useModal } from "@/shared/hooks/useModals";
import { useEffect, useState } from "react";
import { pageRoutes } from "@/app/apiRouters";
import { useCartStore } from "@/store/cart/useCartStore";
import { SideNavigationBar } from "./SideNavigationBar";
import { CartButton } from "./CartButton";
import { ProfileButton } from "./ProfileButton";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export const NavigationBar: React.FC = () => {
  const { isOpen, toggleModal } = useModal();
  const { user, isLogin } = useAuthStore();
  const { cart, initCart, resetCart } = useCartStore();
  const cartLength = cart.length;
  const [bgColor, setBgColor] = useState("bg-gray-800 bg-opacity-60");
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBgColor("bg-gray-900 bg-opacity-80");
      } else {
        setBgColor("bg-gray-800 bg-opacity-60");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${bgColor} pt-4 pb-4 pl-8 pr-8 flex justify-between items-center mb-60px fixed z-10 w-full`}
    >
      <button
        onClick={toggleModal}
        className="text-yellow-500 h-8 md:hidden w-80"
      >
        <Menu className="w-8 h-8" />
      </button>

      <Link
        className="text-3xl font-bold text-yellow-500 w-full text-center md:text-left md:w-80"
        to={pageRoutes.main}
      >
        <h1>
          <span className="mr-1">DoGun</span>
          <span>DoGun</span>
        </h1>
      </Link>

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

      <div className="justify-between items-center ml-6 w-80">
        <div className="flex-grow flex justify-around">
          <CartButton user={user} cartLength={cartLength} initCart={initCart} resetCart={resetCart} />
          <ProfileButton user={user} isLogin={isLogin} />
          {isLogin ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </header>
  );
};
