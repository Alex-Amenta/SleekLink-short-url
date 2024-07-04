/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "borderWidth": "borderWidth 3s infinite alternate",
      },
      keyframes: {
        borderWidth: {
          "0%": { width: "10px", opacity: "0" },
          "100%": { width: "100px", opacity: "1" },
        },
      },
    }
    },
    plugins: [],
  };
