import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <button
        onClick={() => setTheme(theme === "ligth" ? "dark" : "ligth")}
        className="hover:bg-black/10 dark:hover:bg-white/10 transition p-2 rounded-md group"
      >
        {theme === "ligth" ? (
          <MoonIcon className="group-hover:rotate-12" />
        ) : (
          <SunIcon className="group-hover:rotate-12" />
        )}
      </button>
    </>
  );
};

export default ThemeSwitcher;
