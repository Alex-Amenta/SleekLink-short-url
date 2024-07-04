"use client";

import { useTheme } from "next-themes";

const Hero = () => {
  const { theme } = useTheme();

  const fromColor = theme === "ligth" ? "from-black" : "from-green-950/20";
  return (
    <div>
      <h1
        className={`text-6xl text-center text-pretty font-bold mt-16 mb-6 bg-gradient-to-r ${fromColor} to-green-600 inline-block text-transparent bg-clip-text`}
      >
        Acorta tus enlaces de manera elegante y comparte con facilidad
      </h1>
      <p className="text-lg text-center text-black/65 dark:text-white/65">
        SleekLink es tu compañero perfecto para transformar URLs largas y
        complicadas en enlaces cortos y fáciles de compartir. ¡Simplemente pega
        tu URL, obtén tu enlace corto y compártelo con el mundo!
      </p>
    </div>
  );
};

export default Hero;
