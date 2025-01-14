import Image from "next/image";
import Link from "next/link";
import homeDemo from "../../public/home-demo.png";
import { MoveRight } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden relative bg-base-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(93,94,253,0.3),rgba(255,255,255,0))]">
      <header className="max-w-6xl w-full mx-auto px-6 lg:px-10 mt-8 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <div className="flex items-center gap-2">
            <Image src={"/logo.png"} width={32} height={32} alt="logo" />
            <span className="patrick-hand font-bold text-2xl md:text-3xl text-primary">
              Learnit
            </span>
          </div>
        </Link>
        <Link className="flex items-center justify-center" href="/signin">
          <button className="btn btn-primary btn-sm sm:btn-md flex items-center gap-2">
            <span className="font-bold text-primary-content">Login</span>
            <MoveRight className="w-5 h-5 text-primary-content" />
          </button>
        </Link>
      </header>
      <main className="mx-auto max-w-7xl">
        <section className="pt-20 md:pt-24 lg:pt-28 xl:pt-32">
          <div className="container px-6 lg:px-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-primary tracking-wide mb-6 fade-pullup text-4xl font-bold sm:text-5xl md:text-6xl/none xl:text-7xl/none">
                  Learn 10x Faster
                  <br />
                  With LearnIt
                </h1>
                <p className="fade-pullup-delayed-1 font-medium text-secondary md:text-xl">
                  Summarize your notes, generate quizzes and discuss with peers.
                </p>
              </div>
              <div className="w-full max-w-5xl">
                <div className="flex justify-center">
                  <Link href={"/signup"}>
                    <div className="px-4 py-2 w-max flex gap-2 items-center shadow-sm rounded-full bg-primary bg-opacity-10 hover:bg-opacity-20 transform active:scale-95 transition duration-150">
                      <p className="text-primary text-base font-medium">
                        Create Your First Notebook
                      </p>
                      <MoveRight className="w-5 h-5 text-primary" />
                      <i className="shine-btn"></i>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="max-w-6xl w-full mx-auto px-6 lg:px-10">
        <section className="mockup-browser bg-base-content border my-10">
          <div className="mockup-browser-toolbar">
            <div className="input text-base-content">
              learnit-tawny.vercel.app
            </div>
          </div>
          <div className="bg-base-300 flex justify-center">
            <Image className="w-full" src={homeDemo} alt="LearnIt Homepage" />
          </div>
        </section>
      </div>
      <footer className="mb-6 md:mb-10 max-w-7xl w-full mx-auto border-t border-gray-300 pt-4 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-xl md:text-3xl font-bold text-primary">LearnIt</h1>
        <p className="text-base-content mt-2 text-sm md:text-base">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
