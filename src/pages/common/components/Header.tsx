import { CartButton } from "./CartButton";
import { LoginButton } from "./LoginButton";
import { ProfileButton } from "./ProfileButton";
import { LogoutButton } from "./LogoutButton";

export const Header = ({ isLogin, user }) => {
  return (
    <>
      <header className="bg-gray-800 pt-4 pb-4 pl-6 pr-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-yellow-500 tracking-widest">
          이커머스
        </h1>
        <nav className="hidden md:flex justify-between items-center ml-6 p-1 w-60">
          <CartButton />
          <ProfileButton user={user} isLogin={isLogin} />
          {isLogin ? <LogoutButton /> : <LoginButton />}
        </nav>
      </header>
    </>
  );
};
