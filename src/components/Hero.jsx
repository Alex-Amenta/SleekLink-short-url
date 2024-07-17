"use client";

import { useTheme } from "next-themes";

const Hero = () => {
  const { theme } = useTheme();

  const fromColor = theme === "ligth" ? "from-black/90" : "from-white/70";
  return (
    <div>
      <h1
        className={`animate-bounce sm:hidden text-6xl text-center text-pretty font-bold mt-16 mb-6 bg-gradient-to-r ${fromColor} to-green-600 inline-block text-transparent bg-clip-text`}
      >
        Acorta y comparte links facilmente
      </h1>
      <h1
        className={`hidden sm:block text-6xl text-center text-pretty font-bold mt-16 mb-6 bg-gradient-to-r ${fromColor} to-green-600 inline-block text-transparent bg-clip-text`}
      >
        Acorta tus links de manera elegante y comparte con facilidad
      </h1>
      <p className="hidden sm:block text-base w-full text-center lg:w-[80%] lg:mx-auto text-black/65 dark:text-white/65">
        SleekLink es tu compañero perfecto para transformar URLs largas y
        complicadas en enlaces cortos y fáciles de compartir. ¡Simplemente pega
        tu URL, obtén tu enlace corto y compártelo con el mundo!
      </p>
      <p className="sm:hidden text-base w-full text-center lg:w-[70%] lg:mx-auto text-black/65 dark:text-white/65">
        ¡Simplemente pega tu URL, obtén tu enlace corto y compártelo con el
        mundo!
      </p>

    </div>
  );
};

export default Hero;
