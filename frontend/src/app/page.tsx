"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import styles from "@/styles/Banner.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center w-full max-w-[1200px]">
        <section
          id="section-about"
          className={`text-6xl text-center relative one group transform transition-all duration-3000 ease-out ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="text-left mt-96 text-7xl font-serif font-light">
            <span className="block">Hi! my</span>
            <span className="block">
              name is <b className="text-8xl">Adam</b>
              <span className="accent">.</span>
            </span>
          </div>

          <span className="absolute mt-5 -bottom-5 left-0 w-0 transition-all h-2 bg-green-400 group-hover:w-full dark:bg-blue-500"></span>
        </section>
        <section
          id="section-projects"
          className="text-lg text-center transition-opacity duration-500 mt-5 w-full"
        >
          This website is still under construction. Check back soon for updates
          !
        </section>
        <section
          id="section-fun"
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
        <section className="w-full mt-36 relative">
          <div className="left-8 sm:left-20 items-center">
            <p className="text-sm italic mb-2">Scroll !</p>
            {/* <svg height="3000" width="100%">
              <path
                d="
                  M1,0 
                  L1,300
                  C1,450, 100,500, 250,500
                  S500,550, 500,750
                  L500,1250
                  C500,1350, 600,1400, 750,1400
                  S1000,1450, 1000,2000
                  L2000,3000
                "
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
                className="dark:stroke-white"
              />
            </svg> */}
            <svg height="750" width="1">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="5000"
                stroke="black"
                strokeWidth="1"
                className="dark:stroke-white"
              />
            </svg>
          </div>
        </section>

        <section className="mt-32" id="section-about">
          <div className="w-full max-w-[1200px]">
            <div className="flex flex-col gap-4 items-center">
              <div className="text-5xl font-serif font-light pb-10">
                <b>About Me</b>
                <span className="accent">!</span>
              </div>
              <div className="text-xl mt-5 mb-10 w-3/4">
                I am an aspiring developer and creator looking to make a
                positive impact through technology. My passion lies in building
                innovative solutions that solve real-world problems. I enjoy
                learning new technologies and continuously improving my skills.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 w-full">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
