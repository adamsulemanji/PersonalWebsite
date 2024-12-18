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
            <p className="text-3xl text-center sm:text-left text-gray-800 dark:text-gray-200">
              Internships
            </p>
            <p className="text-lg text-center sm:text-left text-gray-800 dark:text-gray-200">
              My first internship was at <b>PricewaterhouseCoopers</b> (PwC) as
              a <b>Data and Technology Start Intern</b> in the summer of 2022. I
              worked on a team of 5 to deliver key insights to a non-profit
              leadership about what is the best course of action and
              recommendation to increase donor engagement and retention.
              <br />
              <br />
              This was my first internship do the whole thing was a learning
              opportunity. After this I was able to take what I learned and
              apply it to my next internship although not related to what I
              would do next.
            </p>
            <p className="text-lg text-center sm:text-left text-gray-800 dark:text-gray-200">
              My second internship was at <b>Goldman Sachs</b> as a{" "}
              <b>Market Risk Summear Analyst</b> in the summer of 2023. I helped
              manage interest rate risk within the Goldman Sachs Bank Legal
              Entity. I specifically looked at how Delta and Gamma values
              changed over time with the fluctating interest rates climate. I
              was also a developer who created a new risk metric that allowed
              use to see our delta value in correlation with other bond tenures.
            </p>
            <p className="text-lg text-center sm:text-left text-gray-800 dark:text-gray-200">
              My third and final internship was with <b>Amazon</b> as a{" "}
              <b>Software Development Engineer Intern</b> in the summer of 2024.
              I worked in the Cross Borders Organization, more specifically the
              Crosslistings team which allows customers to buy different
              products from different Amazon marketplaces. This was my first big
              tech internship which allowed me to gain full development
              experience in a large-scale, high-impact environment.
            </p>
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
