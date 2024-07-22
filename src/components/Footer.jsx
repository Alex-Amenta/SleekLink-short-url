import { HeartIcon } from "lucide-react";
import GithubIcon from "./ui/icons/social/GithubIcon";
import LinkedinIcon from "./ui/icons/social/LinkedinIcon";

const Footer = () => {
  return (
    <footer className="pb-10 text-black dark:text-white flex justify-between items-center">
      <div>
        <p>
          ©Creado por{" "}
          <a
            className="hover:underline"
            href="https://www.linkedin.com/in/alexander-amenta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alexander Amenta
          </a>{" "}
          <span className="inline-flex align-bottom">
            <HeartIcon size={20}/>
          </span>
        </p>
      </div>
      <div className="flex justify-center items-center gap-4">
        <a
          href="https://www.linkedin.com/in/alexander-amenta/"
          target="_blank"
          rel="noopener noreferrer "
          className="hover:bg-green-500 dark:hover:bg-green-700 transition border border-black dark:border-white/50 p-1 rounded-md"
        >
          <LinkedinIcon />
        </a>
        <a
          href="https://github.com/Alex-Amenta"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-green-500 dark:hover:bg-green-700 transition border border-black dark:border-white/50 p-1 rounded-md"
        >
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
