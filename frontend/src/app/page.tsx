"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import styles from "@/styles/Banner.module.css";
import { useState, useEffect, useRef } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Home() {
  const [introShown, setIntroShown] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [hiVisible, setHiVisible] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [constructionVisible, setConstructionVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [scrollPromptVisible, setScrollPromptVisible] = useState(false);

  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [sportsRef, sportsVisible] = useScrollAnimation();
  const [randomRef, randomVisible] = useScrollAnimation();

  useEffect(() => {
    if (!introShown) {
      const animations = [
        { setter: setIntroVisible, delay: 100 },
        { setter: setHiVisible, delay: 600 },
        { setter: setNameVisible, delay: 1200 },
        { setter: setConstructionVisible, delay: 1800 },
        { setter: setDescriptionVisible, delay: 2400 },
        { setter: setScrollPromptVisible, delay: 3000 },
      ];

      animations.forEach(({ setter, delay }) => {
        const timer = setTimeout(() => {
          setter(true);
        }, delay);
        return () => clearTimeout(timer);
      });

      setIntroShown(true);
    }
  }, [introShown]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center w-full max-w-[1500px]">
        <section
          className={`text-6xl text-center relative one group transform transition-all duration-1000 ease-out ${
            introVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="text-left mt-80 text-7xl font-serif font-light leading-tight">
            <span
              className={`block transform transition-all duration-1000 ease-out ${
                hiVisible ? "translate-x-0 " : "-translate-x-10 "
              }`}
            >
              Hi, my
            </span>
            <span
              className={`block transform transition-all duration-1000 ease-out ${
                nameVisible ? "translate-x-0" : "translate-x-10 "
              }`}
            >
              name is <b className="text-8xl">Adam</b>
              <span className="accent">.</span>
            </span>
          </div>

          <span className="absolute mt-5 -bottom-5 left-0 w-0 transition-all h-2 bg-green-700 group-hover:w-full dark:bg-blue-500"></span>
        </section>

        <section
          id="section-projects"
          className={`text-lg text-center transition-all duration-1000 ${
            constructionVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          This website is still under construction. Check back soon for updates!
        </section>

        <div
          className={`text-2xl mt-3 leading-loose line-wrapped transition-all duration-1000 ${
            descriptionVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          I am an aspiring <b className="accent">Developer</b> and{" "}
          <b className="accent">Creator</b> looking to make a positive impact
          through technology. My interest lies in building creating solutions
          that help me and others in their lives.
        </div>

        <section
          className={`grid grid-cols-2 w-full mt-32 transition-all duration-1000 ${
            scrollPromptVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
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
                className={`transition-transform duration-[3s] ease-out dark:stroke-white ${
                  scrollPromptVisible ? "grow-line" : ""
                }`}
              />
            </svg>
          </div>
          <div></div>
        </section>

        <section
          ref={aboutRef}
          className={`mt-32 transform transition-all duration-1000 ease-out ${
            aboutVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
          id="section-about"
        >
          <div className="w-full max-w-[1500px]">
            <div className="flex flex-col gap-4 items-center"></div>
            <div className="grid grid-cols-2 w-full">
              <div className="items-center justify-center text-xl leading-relaxed">
                <p>
                  My first day of college I wasnt sure what I really wanted to
                  be. My parents and friends told me I should become a{" "}
                  <span className="font-bold accent">doctor</span> so I tried
                  and pursued{" "}
                  <span className="font-bold accent">
                    biomedical engineering
                  </span>
                  . Texas A&M requires all engineering students to take one
                  coding class in{" "}
                  <span className="font-bold accent">python</span> their first
                  semester so I did. Since then, I loved the idea of{" "}
                  <span className="font-bold accent">programming</span> but even
                  more so the idea of{" "}
                  <span className="font-bold accent">building</span>.
                </p>
                <p className="mt-4">
                  After my first year, I declared{" "}
                  <span className="font-bold accent">Computer Science</span> as
                  my major not really knowing the journey I was getting myself
                  into. The next 3 years were filled with endless days of
                  learning and building and everything in between. After 3.5
                  long but actually short years, I graduated with a degree in
                  Computer Science and a minor in{" "}
                  <span className="font-bold accent">Statistics</span>. During
                  sophomore year of college, I knew I wanted to continue my
                  education and get a masters degree. I decided to do an
                  accelerated masters program in Computer Science and graduated
                  with my masters in December of 2024.{" "}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <p>Image PlaceHolder</p>
              </div>
              <div className="mt-36"></div>
              <div></div>
            </div>
          </div>
        </section>

        <section
          ref={sportsRef}
          className={`w-full mt-32 transform transition-all duration-1000 ease-out ${
            sportsVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="grid grid-cols-2 w-full">
            <div className="flex items-center justify-center">
              <p>Image PlaceHolder</p>
            </div>
            <div className="text-xl leading-relaxed">
              <p className="mb-5 text-5xl font-bold">
                Sports all the time
                <span className="accent text-6xl font-serif">.</span>
              </p>
              <p>
                During my days of youth (technically Im still young, Im only
                22), I tried to play every sport. My dad signed me up for{" "}
                <span className="font-bold accent">KYS</span> (Katy Youth
                Soccer) but I realized I wasnt very good. I later switched into{" "}
                <span className="font-bold accent">basketball</span> through the
                local <span className="font-bold accent">KYB</span> (Katy Youth
                Basketball) league and played for a few years with of course my
                dad as the coach as well.
              </p>
              <p className="mt-4">
                During my middle school years, I transitioned into{" "}
                <span className="font-bold accent">baseball</span> as I realized
                I could pitch pretty well. But throughout all of this, I was
                playing <span className="font-bold accent">tennis</span> because
                thats the sport my dad played growing up. When I got to high
                school I decided to switch into{" "}
                <span className="font-bold accent">tennis</span> full time
                dropping both organized baseball and basketball.{" "}
              </p>
              <p className="mt-4">
                These days I now spend my time playing{" "}
                <span className="font-bold accent">tennis</span>{" "}
                <span className="text-md">
                  (pickleball isnt a real sport...sorry)
                </span>
                , trying to fix my slice in{" "}
                <span className="font-bold accent">golf</span> (thanks
                baseball...), playing 3 v 3{" "}
                <span className="font-bold accent">basketball</span> (dont like
                running), running half marathon races (I like the medals) and
                trying to become a great{" "}
                <span className="font-bold accent">Quarterback</span> in flag
                football.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={randomRef}
          className={`w-full mt-32 transform transition-all duration-1000 ease-out ${
            randomVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="grid grid-cols-2 w-full">
            <div className="text-xl leading-relaxed">
              <p className="mb-5 text-5xl font-bold">
                Random placeholder
                <span className="accent text-6xl font-serif">.</span>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
              </p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <p>Image PlaceHolder</p>
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
