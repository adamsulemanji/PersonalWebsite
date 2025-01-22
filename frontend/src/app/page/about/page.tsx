'use client';

export default function Page() {
  return (
    <div>
      <section
        className="transform transition-all duration-1000 ease-out sm:mt-8"
        id="section-about"
      >
        <div className="w-full max-w-[1500px]">
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
            <div className="items-center justify-center leading-relaxed">
              <p>
                My first day of college I wasnt sure what I really wanted to be.
                My parents and friends told me I should become a{' '}
                <span className="accent font-bold">Doctor</span> so I tried and
                pursued{' '}
                <span className="accent font-bold">Biomedical Engineering</span>
                . Texas A&M requires all engineering students to take one coding
                class in <span className="accent font-bold">Python</span> their
                first semester so I did. Since then, I loved the idea of{' '}
                <span className="accent font-bold">programming</span> but even
                more so the idea of{' '}
                <span className="accent font-bold">building</span>.
              </p>
              <p className="mt-4">
                After my first year, I declared{' '}
                <span className="accent font-bold">Computer Science</span> as my
                major not really knowing the journey I was getting myself into.
                The next 2.5 years were filled with endless days of learning and
                building and everything in between. After 3.5 long but actually
                short years, I graduated with a degree in Computer Science and a
                minor in <span className="accent font-bold">Statistics</span>.
                During sophomore year of college, I knew I wanted to continue my
                education and get a masters degree. I decided to do an
                accelerated masters program in Computer Science and which I
                graduated in December 2024. Postgrad I plan on returning back to{' '}
                <b className="accent text-xl underline-offset-auto">Amazon</b>{' '}
                in Seattle a part of the Crosslistings Crossborders team{' '}
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
        <div className="mt-24 grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src="/images/football.jpeg"
              alt="Football Game"
              className="w-full rounded-lg object-scale-down shadow-xl"
            />
          </div>
          <div className="leading-relaxed">
            <p className="mb-5 text-5xl font-bold">
              Sports all the time
              <span className="accent font-serif text-6xl">.</span>
            </p>
            <p>
              During my days of youth (technically I'm still young, I'm only
              22), I tried to play every sport. My dad signed me up for{' '}
              <span className="accent font-bold">KYS</span> (Katy Youth Soccer)
              but I realized I wasn't very good. I later switched into{' '}
              <span className="accent font-bold">basketball</span> through the
              local <span className="accent font-bold">KYB</span> (Katy Youth
              Basketball) league and played for a few years with of course my
              dad as the coach as well.
            </p>
            <p className="mt-4">
              During my middle school years, I transitioned into{' '}
              <span className="accent font-bold">baseball</span> as I realized I
              could pitch pretty well. But throughout all of this, I was playing{' '}
              <span className="accent font-bold">tennis</span> because that's
              the sport my dad played growing up. When I got to high school I
              decided to switch into{' '}
              <span className="accent font-bold">tennis</span> full time
              dropping both organized baseball and basketball.{' '}
            </p>
            <p className="mt-4">
              These days I now spend my time playing{' '}
              <span className="accent font-bold">tennis</span>{' '}
              <span className="text-md">
                (pickleball isn't a real sport...sorry)
              </span>
              , trying to fix my slice in{' '}
              <span className="accent font-bold">golf</span> (thanks
              baseball...), playing 3 v 3{' '}
              <span className="accent font-bold">basketball</span> (don't like
              running), running half marathon races (I like the medals) and
              trying to become a great{' '}
              <span className="accent font-bold">Quarterback</span> in flag
              football.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full transform transition-all duration-1000 ease-out">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10 mt-24">
              <div className="leading-relaxed">
                <p className="mb-5 text-5xl font-bold">
                  Houston and Media
                  <span className="accent text-6xl font-serif">.</span>
                </p>
                <p>
                  I was born and raised in Houston, technically Katy for anyone
                  in Texas.
                </p>
                <p className="mt-4">
                  Houston is notorisoulsy amazing for their food and sports
                  scene. As a lifelong fan of the Houston Astros, Rockets and
                  Texans. Currently, my attention is on the Rockets as we have
                  strong defensive young core under new coaching. These factors
                  have led use to be 2nd in the west, which itself is a
                  extremely hard division. In terms of media, I am currently
                  watching Naruto and just watched the The Handmaiden{" "}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/houston.jpg"
                  alt="Houston"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </section>
    </div>
  );
}
