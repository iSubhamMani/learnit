import SignupForm from "@/components/SignupForm";
import Image from "next/image";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="min-h-screen px-5 md:px-10 lg:px-16 py-8 bg-base-200 w-full">
      <header className="mx-auto max-w-7xl">
        <Link className="flex items-center justify-center" href="/">
          <div className="flex items-center gap-2">
            <Image src={"/logo.png"} width={32} height={32} alt="logo" />
            <span className="patrick-hand font-bold text-2xl md:text-3xl text-primary">
              Learnit
            </span>
          </div>
        </Link>
      </header>
      <div className="mx-auto w-full max-w-lg">
        <main className="text-center mt-10">
          <SignupForm />
          <div>
            <p className="mt-4 text-base-content">
              Already have an account?{" "}
              <Link className="text-primary font-medium" href="/signin">
                Sign in
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignupPage;
