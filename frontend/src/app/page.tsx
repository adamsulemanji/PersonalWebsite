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
          className={`text-6xl text-center relative one group transform transition-all duration-3000 ease-out ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="text-left mt-80 text-7xl font-serif font-light leading-tight">
            <span className="block">
              Hi<span className="accent">!</span> my
            </span>
            <span className="block">
              name is <b className="text-8xl">Adam</b>
              <span className="accent">.</span>
            </span>
          </div>
          <span className="absolute mt-5 -bottom-5 left-0 w-0 transition-all h-2 bg-green-700 group-hover:w-full dark:bg-blue-500"></span>
        </section>
        <section
          id="section-projects"
          className="text-lg text-center transition-opacity duration-500 mt-5 w-full"
        >
          This website is still under construction. Check back soon for updates
          !
        </section>
        <div className="text-xl mt-3 leading-loose line-wrapped">
          I am an aspiring <b className="accent">Developer</b> and{" "}
          <b className="accent">Creator</b> looking to make a positive impact
          through technology. My interest lies in building creating solutions
          that help me and others in their lives.
        </div>
        <section
          id="section-fun"
          className={`w-full overflow-hidden ${styles.marqueeContainer} transition-opacity duration-500 mt-5`}
        >
          <div className={`w-full ${styles.marquee}`}>
            <span className="mx-4">Welcome to my personal website!</span>
            <span className="mx-4">Stay tuned for updates and progress!</span>
            <span className="mx-4">
              Check out my projects once they are done!
            </span>
            <span className="mx-4">
              I am trying to use AI as little as possible to build this!
            </span>
          </div>
        </section>
        <section className="grid grid-cols-2 w-full mt-32">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-m mb-2 animate-bounce tracking-widest">
              Scroll !
            </p>
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
          <div></div>
        </section>

        <section className="mt-32" id="section-about">
          <div className="w-full max-w-[1200px]">
            <div className="flex flex-col gap-4 items-center"></div>
            <div className="grid grid-cols-2 w-full">
              <div className="items-center justify-center text-xl">
                <div>
                  <p className="mb-5 text-5xl font-bold">
                    Heading<span className="accent text-7xl font-serif">.</span>
                  </p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
                <div className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.{" "}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <p>Image PlaceHolder</p>
              </div>
              <div className="mt-36"></div>
              <div></div>
              <div className="flex items-center justify-center">
                <p>Image PlaceHolder</p>
              </div>
              <div className="">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.{" "}
                </p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="mt-36"></div>
              <div></div>
              <div className="">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.{" "}
                </p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <p>Image PlaceHolder</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <section id="section-contact">
        <Footer />
      </section>
    </div>
  );
}
