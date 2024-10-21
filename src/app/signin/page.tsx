"use client";

import SigninForm from "@/components/SigninForm";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen px-5 py-8 bg-base-200 w-full">
      <header className="mx-auto max-w-7xl">
        <Link href={"/"}>
          <h1 className="text-2xl md:text-4xl font-bold text-primary">
            LearnIt
          </h1>
        </Link>
      </header>
      <div className="mx-auto w-full max-w-lg">
        <main className="text-center my-10">
          <SigninForm />
          <div>
            <p className="mt-4 text-base-content">
              Don&apos;t have an account?{" "}
              <Link className="text-primary font-medium" href="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
