const Footer = () => {
  return (
    <footer className="pb-10 text-green-950 flex justify-between items-center font-bold">
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
          🖤
        </p>
      </div>
      <div className="flex justify-center items-center gap-4">
        <a
          href="https://www.linkedin.com/in/alexander-amenta/"
          target="_blank"
          rel="noopener noreferrer "
          className="hover:scale-125 transition"
        >
          <img src="/linkedin.svg" alt="Icono de LinkedIn" />
        </a>
        <a
          href="https://github.com/Alex-Amenta"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition"
        >
          <img src="/github.svg" alt="Icono de Github" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
