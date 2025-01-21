import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="section-contact"
      className="transition-opacity duration-500 mt-20 px-4 sm:px-8"
    >
      <hr className="my-10 border-t border-gray-300 w-full" />
      <h6 className="text-center mt-10 mb-5">
        Thanks for reading this far, feel free to reach out to grab something to
        eat and chat !
      </h6>
      <h6 className=" text-md flex items-center justify-center mb-5 text-center">
        Made with ❤️ by Adam Sulemanji
      </h6>
      <div className="flex justify-center pb-10 gap-36">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/adamsulemanji"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/adamsulemanji/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.instagram.com/adam_sulemanji"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:adam.k.sulemanji@gmail.com"
        >
          <FaEnvelope />
        </a>
        <a href="/resume.pdf">
          <p className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm">
            Resume
          </p>
        </a>
      </div>
    </footer>
  );
}
