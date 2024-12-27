"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useInView } from "react-intersection-observer";

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

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.onbeforeunload = function () {
  //       window.scrollTo(0, 0);
  //     };
  //   }
  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.onbeforeunload = null;
  //     }
  //   };
  // }, []);

  const handlePasswordSubmit = () => {
    if (password === "nikki") {
      setIsAuthenticated(true);
      window.open("https://mealtracker.adamsulemanji.com", "_blank");
    } else {
      alert("Incorrect password");
    }
  };

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

  const renderImage = (src: string, alt: string) => {
    const { ref, inView } = useInView({
      threshold: 0.25,
      triggerOnce: true,
    });

    return (
      <div ref={ref} className="relative w-full h-full">
        <div className="absolute inset-0 bg-[length:10px_10px] rounded-lg staggered-dots transition-opacity duration-1000"></div>
        {/* <div
          className={`absolute inset-0 bg-green-700 dark:bg-blue-400 rounded-lg transition-transform duration-1000 delay-2000 ${
            inView ? "translate-y-0" : "translate-y-full"
          }`}
        ></div> */}
        <img
          src={src}
          alt={alt}
          className={`rounded-sm transition-transform duration-1000 delay-[2500ms] ${
            inView ? "translate-y-0" : "translate-y-full"
          }`}
        />
      </div>
    );
  };

  const imagesLeft = [
    { src: "/images/nikki.jpg", alt: "Nikki" },
    { src: "/images/aggiefootball.jpg", alt: "Aggie Football" },
    { src: "/images/mountain.jpg", alt: "Mountain" },
    { src: "/images/ringday.jpg", alt: "Ring Day" },
    { src: "/images/ringday2.png", alt: "Ring Day" },
    { src: "/images/ringday3.png", alt: "Ring Day 3" },
    { src: "/images/river.jpg", alt: "River" },
    { src: "/images/skiing.jpg", alt: "Skiing" },
  ];

  const imagesRight = [
    { src: "/images/food.jpg", alt: "Food" },
    { src: "/images/roommates.jpg", alt: "Some of my Roommates" },
    { src: "/images/texans.jpg", alt: "Texans Game" },
    { src: "/images/bday.jpg", alt: "Birthday" },
    { src: "/images/bean.jpg", alt: "Bean" },
    { src: "/images/exec.png", alt: "Exec" },
    { src: "/images/gameday.jpg", alt: "Gameday !" },
    { src: "/images/kfd.png", alt: "Kyle Field Day" },
  ];

  const maxImages = Math.max(imagesLeft.length, imagesRight.length);

  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen m-4 pb-20 gap-16 sm:p-20">
        <NavBar />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center w-full max-w-[1500px]">
          <section
            className={`text-6xl text-center relative one group transform transition-all duration-1000 ease-out ${
              introVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
            id="section-intro"
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
            className={`text-lg text-center transition-all duration-1000 ${
              constructionVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          ></section>

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
              <div className="grid grid-cols-2 w-full gap-10">
                <div className="items-center justify-center text-xl leading-relaxed">
                  <p>
                    My first day of college I wasnt sure what I really wanted to
                    be. My parents and friends told me I should become a{" "}
                    <span className="font-bold accent">Doctor</span> so I tried
                    and pursued{" "}
                    <span className="font-bold accent">
                      Biomedical Engineering
                    </span>
                    . Texas A&M requires all engineering students to take one
                    coding class in{" "}
                    <span className="font-bold accent">Python</span> their first
                    semester so I did. Since then, I loved the idea of{" "}
                    <span className="font-bold accent">programming</span> but
                    even more so the idea of{" "}
                    <span className="font-bold accent">building</span>.
                  </p>
                  <p className="mt-4">
                    After my first year, I declared{" "}
                    <span className="font-bold accent">Computer Science</span>{" "}
                    as my major not really knowing the journey I was getting
                    myself into. The next 2.5 years were filled with endless
                    days of learning and building and everything in between.
                    After 3.5 long but actually short years, I graduated with a
                    degree in Computer Science and a minor in{" "}
                    <span className="font-bold accent">Statistics</span>. During
                    sophomore year of college, I knew I wanted to continue my
                    education and get a masters degree. I decided to do an
                    accelerated masters program in Computer Science and which I
                    graduated in December 2024. Postgrad I plan on returning
                    back to{" "}
                    <b className="text-2xl accent underline underline-offset-auto">
                      Amazon
                    </b>{" "}
                    in Seattle a part of the Crosslistings Crossborders team{" "}
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
            <div className="grid grid-cols-2 w-full gap-10">
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
                  Soccer) but I realized I wasnt very good. I later switched
                  into <span className="font-bold accent">basketball</span>{" "}
                  through the local{" "}
                  <span className="font-bold accent">KYB</span> (Katy Youth
                  Basketball) league and played for a few years with of course
                  my dad as the coach as well.
                </p>
                <p className="mt-4">
                  During my middle school years, I transitioned into{" "}
                  <span className="font-bold accent">baseball</span> as I
                  realized I could pitch pretty well. But throughout all of
                  this, I was playing{" "}
                  <span className="font-bold accent">tennis</span> because thats
                  the sport my dad played growing up. When I got to high school
                  I decided to switch into{" "}
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
                  <span className="font-bold accent">basketball</span> (dont
                  like running), running half marathon races (I like the medals)
                  and trying to become a great{" "}
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
            <div className="grid grid-cols-2 w-full gap-10">
              <div className="text-xl leading-relaxed">
                <p className="mb-5 text-5xl font-bold">
                  Houston and Media
                  <span className="accent text-6xl font-serif">.</span>
                </p>
                <p>
                  I was born and raised in Houston, technically Katy for anyone
                  in Texas.
                </p>
                <p className="mt-4">
                  Houston is notorisoulsy good for food and sports. As a
                  lifelong fan of the Houston Astros, Rockets and Texans.
                  Currently, my attention is on the Rockets as we have strong
                  defensive young core under new coaching. Thesse factors have
                  led use to be 3rd in the west, which itself is a extremely
                  hard division. I am watching Naruto right. Honestly not a fan
                  of anime in general, but I have made an exception for this one
                  so far.{" "}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <p>Image PlaceHolder</p>
              </div>
            </div>
          </section>
          <section className="mt-24 w-full max-w-[1500px]">
            <div className="grid grid-cols-2 w-full gap-10">
              <div className="mt-10">
                <p className="mb-5 text-5xl font-bold">
                  Photographs
                  <span className="accent text-6xl font-serif">.</span>
                </p>
                <p className="text-xl leading-relaxed">
                  Here are a collection of photographs of that define me and my
                  life.
                </p>
              </div>
              <div>
                <div className="w-full h-[150px] bg-[length:10px_10px] rounded-lg staggered-dots"></div>
              </div>
              <div className="flex flex-col gap-10">
                {imagesLeft.map((image, index) => (
                  <div key={index}>{renderImage(image.src, image.alt)}</div>
                ))}
                {imagesLeft.length < maxImages && (
                  <div className="w-full h-[275px] bg-[length:10px_10px] rounded-lg staggered-dots"></div>
                )}
              </div>
              <div className="flex flex-col gap-10">
                {imagesRight.map((image, index) => (
                  <div key={index}>{renderImage(image.src, image.alt)}</div>
                ))}
                {imagesRight.length < maxImages && (
                  <div className="w-full h-[275px] bg-[length:10px_10px] rounded-lg staggered-dots"></div>
                )}
              </div>
            </div>
          </section>
          <section
            className="mt-24 w-full max-w-[1500px]"
            id="section-projects"
          >
            <div className="grid grid-cols-2 w-full gap-10">
              <div className="mt-10">
                <p className="mb-5 text-5xl font-bold">
                  Projects
                  <span className="accent text-6xl font-serif">.</span>
                </p>
                <p className="text-xl leading-relaxed">
                  Here are a collection of things I have been working on and/or
                  built recently.
                </p>
              </div>
              <div>
                <div className="w-full h-[150px] bg-[length:10px_10px] rounded-lg staggered-dots"></div>
              </div>

              <div className="flex items-center justify-center">
                Image Placeholder
              </div>
              <div className="text-xl leading-relaxed">
                <h3 className="mb-5 text-3xl font-bold">
                  This website
                  <span className="accent text-4xl font-serif">.</span>
                </h3>
                <p>
                  Interesting enough this website serves as a project itself.
                  From the design to implementation, I have built this website
                  from scratch. I have used Next.js as the framework and
                  TailwindCSS as the styling library.
                </p>
                <p className="mt-4">
                  The website is completely served through AWS using S3 buckets,
                  cloudfront and route 53. The website is also served through a
                  custom domain that I own that my uncle bought for me 5 years
                  ago as a joke.
                </p>
                <button className="mt-4 px-6 py-2 border-4 border-green-700 dark:border-blue-400 accent font-bold rounded-lg transition-colors duration-300 bg-[length:10px_10px] bg-gradient-to-r from-transparent via-green-600/20 to-transparent dark:via-blue-400/20 hover:bg-green-700 dark:hover:bg-blue-400 hover:text-white">
                  <a
                    href="https://www.adamsulemanji.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to Website
                  </a>
                </button>
              </div>
            </div>
            <hr className="my-10 border-t border-gray-300" />
            <div className="grid grid-cols-2 w-full gap-10">
              <div className="flex items-center justify-center">
                Image Placeholder
              </div>
              <div className="text-xl leading-relaxed">
                <h3 className="mb-5 text-3xl font-bold">
                  Course Monitoring
                  <span className="accent text-4xl font-serif">.</span>
                </h3>
                <p>
                  During my sophomore year, I tried to register for classes but
                  was unable to get into ANY classes. I started a simple web
                  scraping SMS project to monitor the classes I wanted to get
                  into.
                </p>
                <p className="mt-4">
                  Over the years, I have slowly improved into first turning it
                  into a web app using a MERN stack then more recently
                  transforming it into a full CDK application through AWS. It's
                  still a WIP.
                </p>
                <button className="mt-4 px-6 py-2 border-4 border-green-700 dark:border-blue-400 accent font-bold rounded-lg transition-colors duration-300 bg-[length:10px_10px] bg-gradient-to-r from-transparent via-green-600/20 to-transparent dark:via-blue-400/20 hover:bg-green-700 dark:hover:bg-blue-400 hover:text-white">
                  <a
                    href="https://courses.adamsulemanji.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to Course Monitoring
                  </a>
                </button>
              </div>
            </div>
            <hr className="my-10 border-t border-gray-300" />
            <div className="grid grid-cols-2 w-full gap-10">
              <div className="flex items-center justify-center">
                Image Placeholder
              </div>
              <div className="text-xl leading-relaxed">
                <h3 className="mb-5 text-3xl font-bold">
                  Meal Tracker for Nikki
                  <span className="accent text-4xl font-serif">.</span>
                </h3>
                <p>
                  Nikki used to track her meals on a spreadsheet, I could not
                  allow that as a developer
                </p>
                <p className="mt-4">
                  This simple website allows her to track her meals. The site
                  was built completely from my CDK template project I created.{" "}
                </p>
                {isAuthenticated ? (
                  <button className="mt-4 px-6 py-2 border-4 border-green-700 dark:border-blue-400 accent font-bold rounded-lg transition-colors duration-300 bg-[length:10px_10px] bg-gradient-to-r from-transparent via-green-600/20 to-transparent dark:via-blue-400/20 hover:bg-green-700 dark:hover:bg-blue-400 hover:text-white">
                    <a
                      href="https://courses.adamsulemanji.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go to Meal Tracker
                    </a>
                  </button>
                ) : (
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="mt-4 px-4 py-2 border-2 rounded-lg mr-5 focus:outline-none focus:ring-4 focus:ring-green-600 dark:focus:ring-blue-300 border-green-700 dark:border-blue-400 dark:text-white dark:bg-black"
                    />
                    <button
                      onClick={handlePasswordSubmit}
                      className="mt-4 px-6 py-2 border-4 border-green-700 dark:border-blue-400 accent font-bold rounded-lg transition-colors duration-300 bg-[length:10px_10px] bg-gradient-to-r from-transparent via-green-600/20 to-transparent dark:via-blue-400/20 hover:bg-green-700 dark:hover:bg-blue-400 hover:text-white"
                    >
                      Go to Meal Tracker
                    </button>
                  </div>
                )}
                <p className="mt-4 italic text-xs">
                  I put a password on this to protect the information. Sorry{" "}
                </p>
              </div>
            </div>
          </section>
          <hr className="my-10 border-t border-gray-300 w-full" />
        </main>
        <section id="section-contact">
          <Footer />
        </section>
      </div>
    </div>
  );
}
