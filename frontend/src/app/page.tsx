"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import styles from "@/styles/Banner.module.css";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-2xl font-bold text-center sm:text-left">
          Hi! I'm Adam Sulemanji
        </div>
        <div className="text-lg text-center sm:text-left">
          This website is still under construction. Check back soon!
        </div>
        <div
          className={`w-full overflow-hidden whitespace-nowrap ${styles.marqueeContainer}`}
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
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
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
