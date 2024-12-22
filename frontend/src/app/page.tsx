"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import styles from "@/styles/Banner.module.css";
import { useState } from "react";
import { internships } from "@/interfaces/internship";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

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
          <div className={`w-full ${styles.marquee}`}>
            <span className="mx-4">Welcome to my personal website!</span>
            <span className="mx-4">Stay tuned for updates and progress!</span>
            <span className="mx-4">
              Check out my projects once they are done!
            </span>
          </div>
        </section>
        <section className="mt-80 items-center" id="about">
          <div className="text-2xl flex flex-col gap-4 w-full max-w-[1200px] items-center">
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-5xl font-bold text-center mb-10">
                About Me !
              </h2>
              <p className="text-center text-gray-800 dark:text-gray-200">
                I'm Adam Sulemanji. I am passionate about learning about
                anything and figuring out how to make my life easier with
                technology.
              </p>
              <p className="text-center text-gray-800 dark:text-gray-200">
                I am a recent graduate from Texas A&M University. I earned my
                Bachelors of Science in Computer Science in December 2023 and
                continued onto my Masters of Computer Science and graduated in
                December of 2024.
              </p>
            </div>
            <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mt-10">
              Work Experience
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 items-center">
              {internships.map((internship, index) => (
                <div
                  key={index}
                  className={`border border-gray-300 dark:border-gray-700 rounded-lg p-4 cursor-pointer w-full transition-all duration-300 ${
                    expanded === index ? "max-h-[500px]" : "max-h-[150px]"
                  } overflow-hidden`}
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
      <footer id="contact" className="transition-opacity duration-500 mt-20">
        <h6 className="flex items-center justify-center mb-5">
          If you want to contact me, DONT, Just Kidding{" "}
        </h6>
        <div className="items-center flex gap-36">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/adamsulemanji"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-4 w-4 hover:bg-gray-200 dark:hover:bg-gray-800" />
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.linkedin.com/in/adamsulemanji/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-4 w-4 hover:bg-gray-200 dark:hover:bg-gray-800" />
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.instagram.com/adam_sulemanji"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="h-4 w-4 hover:bg-gray-200 dark:hover:bg-gray-800" />
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="mailto:adam.k.sulemanji@gmail.com"
          >
            <FaEnvelope className="h-4 w-4 hover:bg-gray-200 dark:hover:bg-gray-800" />
          </a>
        </div>
      </footer>
    </div>
  );
}
