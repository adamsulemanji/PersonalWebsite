'use client';

export default function Page() {
  const handlePasswordSubmit = () => {
    const enteredPassword = prompt('Enter password');
    if (enteredPassword === 'nikki') {
      window.open('https://mealtracker.adamsulemanji.com', '_blank');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <section className='mt-24 w-full max-w-[1500px]' id='section-projects'>
      <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2'>
        <div className='mt-10'>
          <p className='mb-5 text-5xl font-bold'>
            Projects
            <span className='accent font-serif text-6xl'>.</span>
          </p>
          <p className='leading-relaxed'>
            Here are a collection of things I have been working on and/or built
            recently.
          </p>
        </div>
        <div>
          <div className='staggered-dots h-[150px] w-full rounded-lg bg-[length:10px_10px]'></div>
        </div>

        <div className='flex items-center justify-center'>
          <a
            href='https://www.adamsulemanji.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='/images/systemdiagram.png'
              alt='Website'
              className='w-full rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-green-700 hover:shadow-2xl hover:dark:border-blue-400'
            />
          </a>
        </div>
        <div className='leading-relaxed'>
          <h3 className='mb-5 text-3xl font-bold'>
            This website
            <span className='accent font-serif text-4xl'>.</span>
          </h3>
          <p>
            Interesting enough this website serves as a project itself. From the
            design to implementation, I have built this website from scratch. I
            have used Next.js as the framework and TailwindCSS as the styling
            library.
          </p>
          <p className='mt-4'>
            The website is completely served through AWS using S3 buckets,
            cloudfront and route 53. The website also contains a custom CI/CD
            pipeline that allows me to rebuild and deploy and cloud or bucket
            changes on events of github changes. The website is also served
            through a custom domain that I own that my uncle bought for me 5
            years ago as a joke.
          </p>
        </div>
      </div>
      <hr className='my-10 border-t border-gray-300' />
      <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2'>
        <div className='flex items-center justify-center'>
          <a
            href='https://courses.adamsulemanji.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='/images/coursemonitoring.png'
              alt='Course Monitoring'
              className='w-full rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-green-700 hover:shadow-2xl hover:dark:border-blue-400'
            />
          </a>
        </div>
        <div className='leading-relaxed'>
          <h3 className='mb-5 text-3xl font-bold'>
            Course Monitoring
            <span className='accent font-serif text-4xl'>.</span>
          </h3>
          <p>
            During my sophomore year, I tried to register for classes but was
            unable to get into ANY classes. I started a simple web scraping SMS
            project to monitor the classes I wanted to get into.
          </p>
          <p className='mt-4'>
            Over the years, I have slowly improved into first turning it into a
            web app using a MERN stack then more recently transforming it into a
            full CDK application through AWS. It's still a WIP.
          </p>
        </div>
      </div>
      <hr className='my-10 border-t border-gray-300' />
      <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2'>
        <div className='flex items-center justify-center'>
          <a onClick={handlePasswordSubmit}>
            <img
              src='/images/mealtracker.png'
              alt='Meal Tracker'
              className='w-full rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-green-700 hover:shadow-2xl hover:dark:border-blue-400'
            />
          </a>
        </div>
        <div className='leading-relaxed'>
          <h3 className='mb-5 text-3xl font-bold'>
            Meal Tracker for Nikki
            <span className='accent font-serif text-4xl'>.</span>
          </h3>
          <p>
            Nikki used to track her meals on a spreadsheet, I could not allow
            that as a developer
          </p>
          <p className='mt-4'>
            This simple website allows her to track her meals. The site was
            built completely from my CDK template project I created.{' '}
          </p>
        </div>
      </div>
      <hr className='my-10 border-t border-gray-300' />
      <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2'>
        <div className='items-center justify-center'>
          <a
            href='https://github.com/adamsulemanji/test-aws-cdk-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='/images/basketball.jpg'
              alt='CDK Template'
              className='w-full rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-green-700 hover:shadow-2xl hover:dark:border-blue-400'
            />
          </a>

          <p className='mt-4 text-center text-xs italic'>
            **I don't have a picture of the CDK because it's a CLI, so here is a
            picture of my IM basketball team**
          </p>
        </div>
        <div className='leading-relaxed'>
          <h3 className='mb-5 text-3xl font-bold'>
            CDK Template
            <span className='accent font-serif text-4xl'>.</span>
          </h3>
          <p>
            During my summer internship I lacked the fundamental AWS skills and
            knowledge to hit the ground running at Amazon.
          </p>
          <p className='mt-4'>
            With that I realized that there exists a lack of a CDK tool that
            allows for easy creation of CDK projects. The regular{' '}
            <code className='inline bg-slate-100 px-2 font-mono dark:bg-white dark:text-black'>
              {' '}
              cdk init
            </code>{' '}
            command only provides the scaffolding. The premise of this project
            allows for users to get a fully functional CodePipeline for CI/CD, a
            frontend stack, a cloudfront distribution for custom domains, a few
            of the most common aws services fully integrated with examples and a
            few other things.
          </p>
        </div>
      </div>
    </section>
  );
}
