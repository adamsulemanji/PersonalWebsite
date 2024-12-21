"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import styles from "@/styles/Banner.module.css";
import { useState } from "react";

interface Internship {
  company: string;
  role: string;
  date: string;
  description: string;
  details: string;
}

const internships: Internship[] = [
  {
    company: "Amazon",
    role: "Software Development Engineer Intern",
    date: "Summer 2024",
    description:
      "Worked in the Cross Borders Organization on the Crosslistings team. Gained full development experience in a large-scale, high-impact environment.",
    details:
      "This was my first big tech internship, which allowed me to gain full development experience in a large-scale, high-impact environment.",
  },
  {
    company: "Goldman Sachs",
    role: "Market Risk Summer Analyst",
    date: "Summer 2023",
    description:
      "Managed interest rate risk for the Goldman Sachs Bank Legal Entity. Developed a new risk metric correlating delta values with bond tenures.",
    details:
      "I specifically looked at how Delta and Gamma values changed over time with the fluctuating interest rates climate.",
  },
  {
    company: "PricewaterhouseCoopers (PwC)",
    role: "Data and Technology Start Intern",
    date: "Summer 2022",
    description:
      "Delivered key insights to a non-profit leadership team to enhance donor engagement and retention.",
    details:
      "This was my first internship, so the whole experience was a learning opportunity. After this, I was able to take what I learned and apply it to my next internship, although it was not directly related.",
  },
];

export default function Home() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <section
          id="about"
          className="text-9xl font-bold text-center relative one group bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 dark:from-red-600 dark:via-orange-500 dark:to-yellow-400 inline-block text-transparent bg-clip-text transition-opacity duration-5000"
        >
          <span>Hi! I'm Adam Sulemanji</span>
          <span className="absolute mt-5 -bottom-5 left-0 w-0 transition-all h-2 bg-yellow-400 group-hover:w-full dark:bg-blue-400"></span>
        </section>
        <section
          id="projects"
          className="text-lg text-center transition-opacity duration-500 mt-5"
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
        <section className="mt-80 items-center" id="about">
          <div className="text-2xl flex flex-col gap-4 w-full max-w-[1000px] items-center">
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-5xl font-bold text-center mb-10">
                About Me !
              </h2>
              <p className="text-center text-gray-800 dark:text-gray-200">
                I'm Adam Sulemanji. I am a recent graduate from Texas A&M
                University. I earned my Bachelors of Science in Computer Science
                in December 2023 and continued onto my Masters of Computer
                Science and graduated in December of 2024.
              </p>
              <p className="text-center text-gray-800 dark:text-gray-200">
                I am passionate about learning about anything and figuring out
                how to make my life easier with technology.
              </p>
            </div>
            <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mt-10">
              Internships
            </h3>
            <div className="flex flex-col gap-8 mt-6 items-center">
              {internships.map((internship, index) => (
                <div
                  key={index}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 cursor-pointer w-full max-w-[800px]"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        {internship.company}
                      </h4>
                      <p className="text-lg text-gray-800 dark:text-gray-200">
                        <b>{internship.role}</b> - {internship.date}
                      </p>
                      <p className="text-lg text-gray-800 dark:text-gray-200 mt-2">
                        {internship.description}
                      </p>
                    </div>
                    <div>
                      {expanded === index ? (
                        <span className="text-xl">-</span>
                      ) : (
                        <span className="text-xl">+</span>
                      )}
                    </div>
                  </div>
                  {expanded === index && (
                    <div className="mt-4 text-lg text-gray-800 dark:text-gray-200">
                      {internship.details}
                    </div>
                  )}
                </div>
              ))}
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
