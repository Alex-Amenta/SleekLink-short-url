import { useTheme } from "next-themes";
import SunIcon from "./ui/icons/interface/SunIcon";
import MoonIcon from "./ui/icons/interface/MoonIcon";

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <button
        onClick={() => setTheme(theme === "ligth" ? "dark" : "ligth")}
        className="hover:bg-black/10 dark:hover:bg-white/10 transition p-2 rounded-md group"
      >
        {theme === "ligth" ? <MoonIcon /> : <SunIcon /> }
      </button>
    </>
  );
};

export default ThemeSwitcher;
