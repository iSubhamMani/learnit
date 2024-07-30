"use client";
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard/notebooks");
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export default AuthGuard;
