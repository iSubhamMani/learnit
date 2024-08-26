"use client";

import SigninForm from "@/components/SigninForm";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen px-5 py-8 bg-base-200 w-full">
      <div className="mx-auto w-full max-w-lg">
        <header>
          <section className="text-center mt-10 md:mt-16 space-y-1">
            <h1 className="text-3xl md:text-5xl font-bold text-primary">
              LearnIt
            </h1>
          </section>
        </header>
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
