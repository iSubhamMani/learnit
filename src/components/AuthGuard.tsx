"use client";
import { auth } from "@/services/firebase";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface User {
  email: string;
  _id: string;
  displayName: string;
  photoURL: string;
}

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    async function addUserToDB(user: User) {
      try {
        const response = await axios.post("/api/user", user);

        if (response.data.success) {
          const token = response.data?.data?.token;
          localStorage.setItem("learnit-token", token);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid, displayName, photoURL } = user;
        if (!email || !uid || !displayName || !photoURL) return;

        addUserToDB({ email, _id: uid, displayName, photoURL }).then(() => {
          router.replace("/u/notebooks");
        });
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export default AuthGuard;
