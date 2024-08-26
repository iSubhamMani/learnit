import SignupForm from "@/components/SignupForm";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen px-5 md:px-10 lg:px-16 py-8 bg-base-200 w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <header className="md:w-1/2">
          <section className="text-center mt-10 md:mt-16 space-y-1">
            <h1 className="text-3xl md:text-5xl font-bold text-primary">
              LearnIt
            </h1>
          </section>
          <section className="text-center my-6">
            <p className="text-base-content font-bold text-2xl md:text-4xl text-balance">
              Combine your learning journey with the power of{" "}
              <span className="text-primary">AI</span> and dive into engaging
              discussions
            </p>
          </section>
        </header>
        <main className="md:w-1/2 text-center">
          <h2 className="font-bold text-2xl text-base-content my-8">
            Get Started in a few steps!
          </h2>
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
