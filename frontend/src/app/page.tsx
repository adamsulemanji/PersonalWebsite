"use client";

import { useState, useEffect } from "react";
import RenderImage from "@/components/RenderImages";
import { imagesLeft, imagesRight } from "@/assets/images";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const [introShown, setIntroShown] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [hiVisible, setHiVisible] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [constructionVisible, setConstructionVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [scrollPromptVisible, setScrollPromptVisible] = useState(false);

  const handlePasswordSubmit = () => {
    const enteredPassword = prompt("Enter password");
    if (enteredPassword === "nikki") {
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
        { setter: setConstructionVisible, delay: 1500 },
        { setter: setDescriptionVisible, delay: 1800 },
        { setter: setScrollPromptVisible, delay: 2200 },
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
    <div className="flex justify-center">
      <div className="max-w-[1200px] w-full">
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen m-4 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-8 row-start-2 w-full max-w-[1500px] px-4 sm:px-8">
            <section
              className={`text-6xl text-center relative one group transform transition-all duration-1000 ease-out ${
                introVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              }`}
              id="section-intro"
            >
              <div>
                <div>
                  <div className="text-left md:mt-12 text-7xl font-serif font-light leading-tight ">
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

                  <span className="absolute mt-5 -bottom-5 left-0 w-0 transition-all h-2 bg-green-700 group-hover:w-2/3 dark:bg-blue-500"></span>
                </div>
              </div>
            </section>

            <section
              className={`text-lg text-center transition-all duration-1000 ${
                constructionVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            ></section>

            <div
              className={`mt-3 leading-tight line-wrapped  duration-1000 ${
                descriptionVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="[&>p]:mt-4">
                <p>
                  Im a Software Engineer at{" "}
                  <span className="underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400">
                    Amazon
                  </span>{" "}
                  in Seattle building systems to help connect customers to
                  products from all over the world. My philosophy in creating
                  and design is to build in order to learn and make the peoples
                  lives around me easier and more fun.
                </p>
                <p>
                  I've previously worked at{" "}
                  <span className="underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400">
                    Amazon
                  </span>
                  , building crossborder software,{" "}
                  <span className="underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400">
                    Goldman Sachs
                  </span>
                  , determining market risk and{" "}
                  <span className="underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400">
                    PricewaterhouseCooper
                  </span>
                  , helping non-profits.
                </p>
              </div>
              <div className="justify-start mt-4">
              <div className="flex justify-start space-x-8 pb-10 text-xl">
                <a
                  className="hover:underline hover:underline-offset-4"
                  href="https://github.com/adamsulemanji"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </a>
                <a
                  className="hover:underline hover:underline-offset-4"
                  href="https://www.linkedin.com/in/adamsulemanji/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
                <a
                  className="hover:underline hover:underline-offset-4"
                  href="https://www.instagram.com/adam_sulemanji"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  className="hover:underline hover:underline-offset-4"
                  href="mailto:adam.k.sulemanji@gmail.com"
                >
                  <FaEnvelope />
                </a>
                <a href="/resume.pdf" className="group">
                  <p className="hover:underline hover:underline-offset-4 text-sm relative">
                  Resume
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
                  </p>
                </a>
              </div>
            </div>
            </div>
            

            <section
              className={`grid grid-cols-1 md:grid-cols-2 w-full mt-32 transition-all duration-1000 ${
                scrollPromptVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex flex-col gap-4 items-center">
                <p className="text-m mb-2 animate-bounce tracking-widest">
                  Scroll !
                </p>
                <svg height="750" width="1" className="hidden md:block">
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
              <div className="mt-8 md:mt-0"></div>
            </section>

            <section
              className="sm:mt-8 transform transition-all duration-1000 ease-out"
              id="section-about"
            >
              <div className="w-full max-w-[1500px]">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
                  <div className="items-center justify-center leading-relaxed">
                    <p>
                      My first day of college I wasnt sure what I really wanted
                      to be. My parents and friends told me I should become a{" "}
                      <span className="font-bold accent">Doctor</span> so I
                      tried and pursued{" "}
                      <span className="font-bold accent">
                        Biomedical Engineering
                      </span>
                      . Texas A&M requires all engineering students to take one
                      coding class in{" "}
                      <span className="font-bold accent">Python</span> their
                      first semester so I did. Since then, I loved the idea of{" "}
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
                      After 3.5 long but actually short years, I graduated with
                      a degree in Computer Science and a minor in{" "}
                      <span className="font-bold accent">Statistics</span>.
                      During sophomore year of college, I knew I wanted to
                      continue my education and get a masters degree. I decided
                      to do an accelerated masters program in Computer Science
                      and which I graduated in December 2024. Postgrad I plan on
                      returning back to{" "}
                      <b className="text-xl accent  underline-offset-auto">
                        Amazon
                      </b>{" "}
                      in Seattle a part of the Crosslistings Crossborders team{" "}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      src="/images/class.jpeg"
                      alt="Me in Class"
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full transform transition-all duration-1000 ease-out">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10 mt-24">
                <div className="flex items-center justify-center">
                  <img
                    src="/images/football.jpeg"
                    alt="Football Game"
                    className="rounded-lg shadow-xl w-full object-scale-down"
                  />
                </div>
                <div className="leading-relaxed">
                  <p className="mb-5 text-5xl font-bold">
                    Sports all the time
                    <span className="accent text-6xl font-serif">.</span>
                  </p>
                  <p>
                    During my days of youth (technically I'm still young, I'm
                    only 22), I tried to play every sport. My dad signed me up
                    for <span className="font-bold accent">KYS</span> (Katy
                    Youth Soccer) but I realized I wasn't very good. I later
                    switched into{" "}
                    <span className="font-bold accent">basketball</span> through
                    the local <span className="font-bold accent">KYB</span>{" "}
                    (Katy Youth Basketball) league and played for a few years
                    with of course my dad as the coach as well.
                  </p>
                  <p className="mt-4">
                    During my middle school years, I transitioned into{" "}
                    <span className="font-bold accent">baseball</span> as I
                    realized I could pitch pretty well. But throughout all of
                    this, I was playing{" "}
                    <span className="font-bold accent">tennis</span> because
                    that's the sport my dad played growing up. When I got to
                    high school I decided to switch into{" "}
                    <span className="font-bold accent">tennis</span> full time
                    dropping both organized baseball and basketball.{" "}
                  </p>
                  <p className="mt-4">
                    These days I now spend my time playing{" "}
                    <span className="font-bold accent">tennis</span>{" "}
                    <span className="text-md">
                      (pickleball isn't a real sport...sorry)
                    </span>
                    , trying to fix my slice in{" "}
                    <span className="font-bold accent">golf</span> (thanks
                    baseball...), playing 3 v 3{" "}
                    <span className="font-bold accent">basketball</span> (don't
                    like running), running half marathon races (I like the
                    medals) and trying to become a great{" "}
                    <span className="font-bold accent">Quarterback</span> in
                    flag football.
                  </p>
                </div>
              </div>
            </section>
            <section className="mt-16 w-full max-w-[1500px]">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
                <div className="mt-10">
                  <p className="mb-5 text-5xl font-bold">
                    Fotographs and Friends
                    <span className="accent text-6xl font-serif">.</span>
                  </p>
                  <p className="leading-relaxed">
                    Here are a collection of photographs of that define me and
                    my life.
                  </p>
                </div>
                <div>
                  <div className="w-full h-[150px] bg-[length:10px_10px] rounded-lg staggered-dots"></div>
                </div>
                <div className="flex flex-col gap-10">
                  {imagesLeft.map((image, index) => (
                    <div key={index}>{RenderImage(image.src, image.alt)}</div>
                  ))}
                </div>
                <div className="flex flex-col gap-10">
                  {imagesRight.map((image, index) => (
                    <div key={index}>{RenderImage(image.src, image.alt)}</div>
                  ))}
                </div>
              </div>
            </section>
            <section
              className="mt-24 w-full max-w-[1500px]"
              id="section-projects"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
                <div className="mt-10">
                  <p className="mb-5 text-5xl font-bold">
                    Projects
                    <span className="accent text-6xl font-serif">.</span>
                  </p>
                  <p className="leading-relaxed">
                    Here are a collection of things I have been working on
                    and/or built recently.
                  </p>
                </div>
                <div>
                  <div className="w-full h-[150px] bg-[length:10px_10px] rounded-lg staggered-dots"></div>
                </div>

                <div className="flex items-center justify-center">
                  <a
                    href="https://www.adamsulemanji.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/systemdiagram.png"
                      alt="Website"
                      className="rounded-lg shadow-xl w-full hover:shadow-2xl hover:scale-105 transition-transform duration-300 hover:border-4 hover:border-green-700 hover:dark:border-blue-400"
                    />
                  </a>
                </div>
                <div className="leading-relaxed">
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
                    The website is completely served through AWS using S3
                    buckets, cloudfront and route 53. The website also contains
                    a custom CI/CD pipeline that allows me to rebuild and deploy
                    and cloud or bucket changes on events of github changes. The
                    website is also served through a custom domain that I own
                    that my uncle bought for me 5 years ago as a joke.
                  </p>
                </div>
              </div>
              <hr className="my-10 border-t border-gray-300" />
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
                <div className="flex items-center justify-center">
                  <a
                    href="https://courses.adamsulemanji.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/coursemonitoring.png"
                      alt="Course Monitoring"
                      className="rounded-lg shadow-xl w-full hover:shadow-2xl hover:scale-105 transition-transform duration-300 hover:border-4 hover:border-green-700 hover:dark:border-blue-400"
                    />
                  </a>
                </div>
                <div className="leading-relaxed">
                  <h3 className="mb-5 text-3xl font-bold">
                    Course Monitoring
                    <span className="accent text-4xl font-serif">.</span>
                  </h3>
                  <p>
                    During my sophomore year, I tried to register for classes
                    but was unable to get into ANY classes. I started a simple
                    web scraping SMS project to monitor the classes I wanted to
                    get into.
                  </p>
                  <p className="mt-4">
                    Over the years, I have slowly improved into first turning it
                    into a web app using a MERN stack then more recently
                    transforming it into a full CDK application through AWS.
                    It's still a WIP.
                  </p>
                </div>
              </div>
              <hr className="my-10 border-t border-gray-300" />
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
                <div className="flex items-center justify-center">
                  <a onClick={handlePasswordSubmit}>
                    <img
                      src="/images/mealtracker.png"
                      alt="Meal Tracker"
                      className="rounded-lg shadow-xl w-full hover:shadow-2xl hover:scale-105 transition-transform duration-300 hover:border-4 hover:border-green-700 hover:dark:border-blue-400"
                    />
                  </a>
                </div>
                <div className="leading-relaxed">
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
                </div>
              </div>
              <hr className="my-10 border-t border-gray-300" />
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
                <div className="items-center justify-center">
                  <a
                    href="https://github.com/adamsulemanji/test-aws-cdk-app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/basketball.jpg"
                      alt="CDK Template"
                      className="rounded-lg shadow-xl w-full hover:shadow-2xl hover:scale-105 transition-transform duration-300 hover:border-4 hover:border-green-700 hover:dark:border-blue-400"
                    />
                  </a>

                  <p className="italic text-xs mt-4 text-center">
                    **I don't have a picture of the CDK because it's a CLI, so
                    here is a picture of my IM basketball team**
                  </p>
                </div>
                <div className="leading-relaxed">
                  <h3 className="mb-5 text-3xl font-bold">
                    CDK Template
                    <span className="accent text-4xl font-serif">.</span>
                  </h3>
                  <p>
                    During my summer internship I lacked the fundamental AWS
                    skills and knowledge to hit the ground running at Amazon.
                  </p>
                  <p className="mt-4">
                    With that I realized that there exists a lack of a CDK tool
                    that allows for easy creation of CDK projects. The regular{" "}
                    <code className="inline bg-slate-100  px-2 dark:bg-white dark:text-black font-mono">
                      {" "}
                      cdk init
                    </code>{" "}
                    command only provides the scaffolding. The premise of this
                    project allows for users to get a fully functional
                    CodePipeline for CI/CD, a frontend stack, a cloudfront
                    distribution for custom domains, a few of the most common
                    aws services fully integrated with examples and a few other
                    things.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
