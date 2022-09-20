const SharedConfig = require("./tailwind-base.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...SharedConfig.theme,
    extend: {
      ...SharedConfig.extends,
      height: { 13: "3.25rem" },
      width: { 22: "5.5rem" },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
