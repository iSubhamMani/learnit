import { MessageCircle, Notebook } from "lucide-react";
import Link from "next/link";
import Logout from "./Logout";
import ThemeSwitcher from "./ThemeSwitcher";

const NavbarMobileBottom = () => {
  return (
    <div className="px-4 py-1 fixed bottom-0 left-0 z-50 w-full border-t border-base-200 bg-base-100 md:hidden shadow-md">
      <nav className="flex items-center justify-between gap-2">
        <Link href={"/u/notebooks"}>
          <Notebook className="w-5 h-5 text-base-content" />
        </Link>
        <Link href={"/u/discussions"}>
          <MessageCircle className="w-5 h-5 text-base-content" />
        </Link>

        <div className="avatar placeholder">
          <div className="ring-base-content ring-offset-base-100 ring-1 ring-offset-2 bg-neutral text-neutral-content w-4 rounded-full">
            <span className="text-xs">U</span>
          </div>
        </div>
        <ThemeSwitcher />
        <Logout />
      </nav>
    </div>
  );
};

export default NavbarMobileBottom;
