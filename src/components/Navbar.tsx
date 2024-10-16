import { MessageCircle, Notebook } from "lucide-react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import Link from "next/link";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col md:flex shadow-md border-r bg-base-100 dark:bg-base-300 border-gray-300 dark:border-gray-600">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-5">
        <Link href="/u/notebooks">
          <div
            className="p-2 tooltip tooltip-right cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-10"
            data-tip="Notebooks"
          >
            <Notebook className="w-6 h-6 text-base-content" />
          </div>
        </Link>
        <Link href="/u/discussions">
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
          <div className="avatar placeholder">
            <div className="ring-base-content ring-offset-base-100 ring-1 ring-offset-2 bg-neutral text-neutral-content w-6 rounded-full">
              <span className="text-xs">U</span>
            </div>
          </div>
        </div>
        <div
          className="p-2 tooltip tooltip-right cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-10"
          data-tip="Theme"
        >
          <ThemeSwitcher />
        </div>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Logout />
      </nav>
    </aside>
  );
};

export default Navbar;
