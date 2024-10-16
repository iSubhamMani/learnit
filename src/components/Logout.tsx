"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <div
      onClick={() => signOut({ callbackUrl: "/signin" })}
      data-tip="Logout"
      className="tooltip tooltip-right"
    >
      <LogOut className="w-5 h-5 md:w-6 md:h-6 text-base-content" />
    </div>
  );
};

export default Logout;
