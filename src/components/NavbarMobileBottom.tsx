import { LogOut, MessageCircle, Notebook } from "lucide-react";
import Link from "next/link";
import Logout from "./Logout";
import ThemeSwitcher from "./ThemeSwitcher";
import { signOut } from "next-auth/react";

const NavbarMobileBottom = () => {
  return (
    <div className="px-4 py-2 fixed bottom-0 left-0 z-50 w-full border-t md:hidden shadow-md bg-base-100 dark:bg-base-300 border-gray-300 dark:border-gray-600">
      <nav className="flex items-center justify-between gap-2">
        <Link
          className="hover:scale-110 transition duration-200 ease-in-out"
          href={"/u/notebooks"}
        >
          <Notebook className="w-6 h-6 text-base-content" />
        </Link>

        <Link
          className="hover:scale-110 transition duration-200 ease-in-out"
          href={"/u/discussions"}
        >
          <MessageCircle className="w-6 h-6 text-base-content" />
        </Link>

        <Link
          className="hover:scale-110 transition duration-200 ease-in-out"
          href={"/u/profile"}
        >
          <div className="avatar placeholder">
            <div className="ring-base-content ring-offset-base-100 ring-1 ring-offset-2 bg-neutral text-neutral-content w-5 rounded-full">
              <span className="text-xs">U</span>
            </div>
          </div>
        </Link>

        <ThemeSwitcher />
        <div
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="p-2 cursor-pointer hover:scale-110 transition duration-200 ease-in-out"
        >
          <LogOut className="w-6 h-6 text-base-content" />
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobileBottom;
