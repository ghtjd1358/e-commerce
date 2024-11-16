import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useModal } from "@/shared/hooks/useModals";
import { useEffect, useState } from "react";
import { pageRoutes } from "@/app/apiRouters";
import { ALL_CATEGORY_ID, categories } from "@/shared/constants";
import { useCartStore } from "@/store/cart/useCartStore";
import { SideNavigationBar } from "./SideNavigationBar";
import { CartButton } from "./CartButton";
import { ProfileButton } from "./ProfileButton";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export const NavigationBar: React.FC = () => {
  const { isOpen, toggleModal } = useModal();
  const { user, isLogin, checkLoginStatus } = useAuthStore();
  const { cart, initCart } = useCartStore();
  const cartLength = cart.length;
  const location = useLocation();
  const [bgColor, setBgColor] = useState("bg-gray-800 bg-opacity-60");
  const categoriesId = categories.map((item) => item.id);

  const locationHeaderStyle = (path) => {
    return location.pathname === path ? "text-yellow-500" : "text-gray-300";
  };

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

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

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
        className="text-3xl font-bold text-yellow-500 tracking-widest w-full text-center md:text-left md:w-80"
        to={pageRoutes.main}
      >
        <h1>이커머스</h1>
      </Link>

      <nav className="hidden md:block w-[25%]">
        <ul className="flex items-center justify-between text-gray-300 font-semibold text-xl w-full tracking-widest">
          <li className={`${locationHeaderStyle("/")}`}>
            <Link to={pageRoutes.main}>홈</Link>
          </li>
          <li
            className={`${categoriesId.some((id) => location.pathname.includes(`/product/${id}`)) ? "text-yellow-500" : "text-gray-300"}`}
          >
            <Link to={`${pageRoutes.product}/${ALL_CATEGORY_ID}`}>상품</Link>
          </li>
          <li>
            <Link to={`${pageRoutes.product}/${ALL_CATEGORY_ID}`}>스타일</Link>
          </li>
          <li>
            <Link to={`${pageRoutes.product}/${ALL_CATEGORY_ID}`}>게시판</Link>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <SideNavigationBar
          user={user}
          isLogin={isLogin}
          cartLength={cartLength}
          initCart={initCart}
          toggleModal={toggleModal}
        />
      )}

      <div className=" justify-between items-center ml-6 w-80">
        <div className="flex-grow flex justify-around">
          <CartButton user={user} cartLength={cartLength} initCart={initCart} />
          <ProfileButton user={user} isLogin={isLogin} />
          {isLogin ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </header>
  );
};
