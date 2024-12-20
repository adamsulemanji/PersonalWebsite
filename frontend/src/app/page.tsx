"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import styles from "@/styles/Banner.module.css";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section
          id="about"
          className="text-9xl font-bold text-center sm:text-left relative one group bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 dark:from-red-600 dark:via-orange-500 dark:to-yellow-400 inline-block text-transparent bg-clip-text transition-opacity duration-5000"
        >
          <span>Hi! I'm Adam Sulemanji</span>
          <span className="absolute mt-5 -bottom-5 left-0 w-0 transition-all h-2 bg-yellow-400 group-hover:w-full dark:bg-blue-400"></span>
        </section>
        <section
          id="projects"
          className="text-lg text-center sm:text-left transition-opacity duration-500 mt-5"
        >
          This website is still under construction. Check back soon!
        </section>
        <section
          id="fun"
          className={`w-full overflow-hidden whitespace-nowrap ${styles.marqueeContainer} transition-opacity duration-500 mt-5`}
        >
          <div className={styles.marquee}>
            <span className="mx-4">Welcome to my personal website!</span>
            <span className="mx-4">Stay tuned for updates and progress!</span>
            <span className="mx-4">
              Check out my projects once they are done!
            </span>
          </div>
        </section>
        <section className="mt-96" id="about">
          <h2 className="text-5xl font-bold text-center sm:text-left mb-10">
            About
          </h2>
          <div className="flex flex-col gap-4 w-full max-w-[1000px]">
            <p className="text-lg text-center sm:text-left text-gray-800 dark:text-gray-200">
              I'm Adam Sulemanji. I am a recent graduate from Texas A&M
              University. I earned my Bachelors of Science in Computer Science
              in December 2023 and continued onto my Masters of Computer Science
              and graduated in December of 2024.
            </p>
            <h3 className="text-3xl font-bold text-center sm:text-left text-gray-800 dark:text-gray-200 mt-10">
              Internships
            </h3>
            <div className="flex flex-col gap-8 mt-6">
              <div>
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  PricewaterhouseCoopers (PwC)
                </h4>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  <b>Data and Technology Start Intern</b> - Summer 2022
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-200 mt-2">
                  I worked on a team of 5 to deliver key insights to a
                  non-profit leadership about the best course of action and
                  recommendations to increase donor engagement and retention.
                  <br />
                  <br />
                  This was my first internship, so the whole experience was a
                  learning opportunity. After this, I was able to take what I
                  learned and apply it to my next internship, although it was
                  not directly related.
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Goldman Sachs
                </h4>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  <b>Market Risk Summer Analyst</b> - Summer 2023
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-200 mt-2">
                  I helped manage interest rate risk within the Goldman Sachs
                  Bank Legal Entity. I specifically looked at how Delta and
                  Gamma values changed over time with the fluctuating interest
                  rates climate. I also developed a new risk metric that allowed
                  us to see our delta value in correlation with other bond
                  tenures.
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Amazon
                </h4>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  <b>Software Development Engineer Intern</b> - Summer 2024
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-200 mt-2">
                  I worked in the Cross Borders Organization, specifically the
                  Crosslistings team, which allows customers to buy different
                  products from different Amazon marketplaces. This was my first
                  big tech internship, which allowed me to gain full development
                  experience in a large-scale, high-impact environment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer
        id="contact"
        className="row-start-3 flex gap-6 flex-wrap items-center justify-center transition-opacity duration-500 mt-20"
      >
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
