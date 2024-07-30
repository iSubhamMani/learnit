"use client";
import { auth } from "@/services/firebase";
import GoogleIcon from "../../../public/google.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        // The signed-in user info.
        //const user = result.user;
        toast.success("Login successful");
        router.replace("/dashboard/notebooks");
      })
      .catch(() => {
        toast.error("Error logging you in. Please try again later");
      });
  };

  return (
    <div className="flex min-h-screen px-5 py-8 bg-base-200 w-full">
      <div className="mx-auto w-full md:max-w-2xl ">
        <header>
          <section className="text-center mt-10 md:mt-16 space-y-1">
            <h1 className="text-3xl md:text-5xl font-bold text-primary">
              LearnIt
            </h1>
          </section>
          <section className="text-center my-6">
            <p className="text-base-content font-bold text-2xl md:text-4xl text-balance">
              Combine your learning journey with the power of AI and dive into
              engaging discussions
            </p>
          </section>
        </header>
        <main className="text-center">
          <h2 className="font-bold text-2xl text-secondary mt-8">
            Get Started in a few steps!
          </h2>
          <button
            onClick={handleGoogleSignIn}
            className="mt-10 btn btn-neutral"
          >
            <Image className="w-5 h-5" src={GoogleIcon} alt="Google" />
            Sign in with Google
          </button>
        </main>
      </div>
    </div>
  );
};

export default Login;
