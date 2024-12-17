"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import styles from "@/styles/Banner.module.css";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-7xl font-bold text-center sm:text-left relative one group bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 dark:from-red-600 dark:via-orange-500 dark:to-yellow-400 inline-block text-transparent bg-clip-text transition-opacity duration-2000">
          <span>Hi! I'm Adam Sulemanji</span>
          <span className="absolute mt-2 -bottom-5 left-0 w-0 transition-all h-2 bg-yellow-400 group-hover:w-full dark:bg-blue-400"></span>
        </div>
        <div className="text-lg text-center sm:text-left transition-opacity duration-500">
          This website is still under construction. Check back soon!
        </div>
        <div
          className={`w-full overflow-hidden whitespace-nowrap ${styles.marqueeContainer} transition-opacity duration-500`}
        >
          <div className={styles.marquee}>
            <span className="mx-4">Welcome to my personal website!</span>
            <span className="mx-4">Stay tuned for updates and progress!</span>
            <span className="mx-4">
              Check out my projects once they are done!
            </span>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center transition-opacity duration-500">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="www.adamsulemanji.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
      </footer>
    </div>
  );
}
