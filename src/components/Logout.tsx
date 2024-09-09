"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <div
      onClick={() => signOut({ callbackUrl: "/signin" })}
      data-tip="Logout"
      className="p-2 tooltip tooltip-right cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-10"
    >
      <LogOut className="w-6 h-6 text-base-content" />
    </div>
  );
};

export default Logout;
