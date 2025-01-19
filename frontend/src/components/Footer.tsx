import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="section-contact"
      className="transition-opacity duration-500 mt-20 px-4 sm:px-8"
    >
      <h6 className="flex items-center justify-center mb-5 text-center">
        Made with ❤️ by Adam Sulemanji
      </h6>
      <div className="flex flex-wrap justify-center gap-8 sm:gap-36">
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
  );
}
