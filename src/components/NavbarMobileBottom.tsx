import { LogOut, MessageCircle, Notebook } from "lucide-react";
import Link from "next/link";
import Logout from "./Logout";
import ThemeSwitcher from "./ThemeSwitcher";
import { signOut } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import { useAppSelector } from "@/lib/store/hooks";

const NavbarMobileBottom = () => {
  const { profilePhoto, displayName } = useAppSelector((state) => state.user);

  return (
    <div className="fixed bottom-2 left-0 z-50 w-full md:hidden flex justify-center">
      <ul className="menu menu-horizontal rounded-box bg-base-100/35 dark:bg-white/10 shadow-xl backdrop-blur-md">
        <li>
          <Link href={"/u/notebooks"}>
            <Notebook className="w-6 h-6 text-base-content" />
          </Link>
        </li>
        <li>
          <Link href={"/u/discussions"}>
            <MessageCircle className="w-6 h-6 text-base-content" />
          </Link>
        </li>
        <li>
          <Link href={"/u/profile"}>
            {profilePhoto ? (
              <div className="avatar">
                <div className="w-6 ring-base-content ring-offset-base-100 ring-1 ring-offset-2 bg-neutral rounded-full">
                  <CldImage
                    width={24}
                    height={24}
                    src={profilePhoto}
                    alt="avatar"
                  />
                </div>
              </div>
            ) : displayName ? (
              <div className="avatar placeholder">
                <div className="ring-base-content ring-offset-base-100 ring-1 ring-offset-2 bg-neutral text-neutral-content w-6 rounded-full">
                  <span className="text-xs">
                    {displayName?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-gray-300 dark:bg-neutral/85 skeleton w-6 h-6 shrink-0 rounded-full"></div>
            )}
          </Link>
        </li>
        <li>
          <ThemeSwitcher />
        </li>
        <li>
          <div onClick={() => signOut({ callbackUrl: "/signin" })}>
            <LogOut className="w-6 h-6 text-base-content" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavbarMobileBottom;
