import { LogOut, MessageCircle, Notebook, UserRound } from "lucide-react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import Link from "next/link";

const Navbar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r border-base-200 md:flex shadow-md bg-base-100">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-5">
        <Link href="/u/notebooks">
          <div
            className="p-2 tooltip tooltip-right cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-10"
            data-tip="Notebooks"
          >
            <Notebook className="w-6 h-6 text-base-content" />
          </div>
        </Link>
        <Link href="/u/discuss">
          <div
            className="p-2 tooltip tooltip-right cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-10"
            data-tip="Discussion Board"
          >
            <MessageCircle className="w-6 h-6 text-base-content" />
          </div>
        </Link>
        <div
          className="p-2 tooltip tooltip-right cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-10"
          data-tip="Profile"
        >
          <UserRound className="w-6 h-6 text-base-content" />
        </div>
        <div
          className="p-2 tooltip tooltip-right cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-10"
          data-tip="Theme"
        >
          <ThemeSwitcher />
        </div>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <div
          data-tip="Logout"
          className="p-2 tooltip tooltip-right cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-10"
        >
          <LogOut className="w-6 h-6 text-base-content" />
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
